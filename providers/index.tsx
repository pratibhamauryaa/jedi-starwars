// // 'use client';

// // import { ReactNode } from 'react';
// // import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// // // For Jotai, we often don't need a special provider, 
// // // but let's demonstrate usage anyway.
// // import { Provider as JotaiProvider } from 'jotai';

// // const queryClient = new QueryClient();

// // export default function Providers({ children }: { children: ReactNode }) {
// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <JotaiProvider>{children}</JotaiProvider>
// //     </QueryClientProvider>
// //   );
// // }

// 'use client';

// import { ReactNode } from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

// export default function Providers({ children }: { children: ReactNode }) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       {children}
//     </QueryClientProvider>
//   );
// }


'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// For Jotai, we often don't need a special provider, 
// but let's demonstrate usage anyway.
import { Provider as JotaiProvider } from 'jotai';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>{children}</JotaiProvider>
    </QueryClientProvider>
  );
}
