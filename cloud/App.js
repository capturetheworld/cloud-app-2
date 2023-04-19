import CloudOSContainer from "./main/CloudOS_Container"
import { QueryClient, QueryClientProvider } from "react-query"
import { useFonts } from "expo-font"
import { setScene } from "./api"
import { StyleSheet, Image, View } from "react-native"
import { useZusStore } from "./data/zustand"

// import { queryClient } from './api'
// import { runTest } from './api/test/testHelper.test'
// runTest();


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <CloudOSContainer />
    </QueryClientProvider>
  )
}

export default App
