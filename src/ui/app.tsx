import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Login } from './components/login'

export default function App() {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
          },
        },
      }),
    [],
  )
  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  )
}
