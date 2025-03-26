'use client'
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Debounce helper
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

interface SWAPIStarship {
  name: string;
  model: string;
  manufacturer: string;
  crew: string;
  hyperdrive_rating: string;
  url: string;
}

interface SWAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SWAPIStarship[];
}

// Single page fetch
async function fetchStarships(page: number, search: string) {
  let url = `https://swapi.dev/api/starships/?page=${page}`;
  if (search) {
    url += `&search=${search}`;
  }
  const { data } = await axios.get<SWAPIResponse>(url);
  return data;
}



  export function useStarships(searchTerm: string) {
    const debouncedSearch = useDebounce(searchTerm, 500);
    const [page, setPage] = useState(1);
    const [starships, setStarships] = useState<SWAPIStarship[]>([]);
  
    const { data, status, refetch, isLoading, isError } = useQuery({
      queryKey: ['starships', page, debouncedSearch],
      queryFn: () => fetchStarships(page, debouncedSearch),
      keepPreviousData: true,
    });
  
    // Move the data->state logic to an effect so it only runs
    // when [data, status, page] changes, preventing infinite loops.
    useEffect(() => {

      console.log('data', data);
      console.log('status', status);  
      console.log('page', page);
      
      if (status === 'success' && data) {
        if (page === 1) {
          setStarships(data?.results);
        } else {
          setStarships((prev) => [...prev, ...data.results]);
        }
      }
    }, [status, data, page]);
  
    // Reset on searchTerm changes
    useEffect(() => {
      setPage(1);
      setStarships([]);
      refetch();
    }, [debouncedSearch, refetch]);
  
    const fetchNextPage = () => {
      if (data?.next) {
        setPage((prev) => prev + 1);
      }
    };
  
    return {
      starships,
      fetchNextPage,
      hasNextPage: Boolean(data?.next),
      isLoading,
      isError,
    };
  }
  
