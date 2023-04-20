import CloudOSContainer from "./main/CloudOS_Container"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CloudOSContainer />
    </QueryClientProvider>
  )
}

export default App
