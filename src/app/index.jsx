import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./ui/global.css"
import Home from "@pages/home"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}

export default App
