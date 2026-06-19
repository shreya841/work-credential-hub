import { QueryClient, dehydrate, hydrate } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // Cache entries for 5 minutes before considering them stale
        gcTime: 1000 * 60 * 10,   // Keep inactive queries in memory for 10 minutes
        refetchOnWindowFocus: false, // Prevent background refetching when window refocused
        retry: 1,                 // Retry failed queries only once
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 1000 * 60 * 5, // Route component preloading cache matches staleTime
    dehydrate: () => {
      return {
        dehydratedState: dehydrate(queryClient),
      };
    },
    hydrate: (state: any) => {
      if (state.dehydratedState) {
        hydrate(queryClient, state.dehydratedState);
      }
    },
  });

  return router;
};
