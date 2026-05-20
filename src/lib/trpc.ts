import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../server/api/routers';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
      // Add auth token to headers if it exists
      headers() {
        const token = localStorage.getItem('authToken');
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
    }),
  ],
});
