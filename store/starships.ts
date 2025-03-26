import { atom } from 'jotai';

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  crew: string;
  hyperdrive_rating: string;
  url: string;
}

// Up to 3 selected starships
export const selectedStarshipsAtom = atom<Starship[]>([]);

