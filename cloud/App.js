import CloudOSContainer from "./main/CloudOS_Container"
import { QueryClient, QueryClientProvider } from "react-query"
import { useFonts } from "expo-font"
import { setScene } from "./api"
import { StyleSheet, Image, View } from "react-native"
import { queryClient } from './query'
// import './sliderHelper'
import { runTest } from '../cloud/test/testHelper.test'
runTest();


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <CloudOSContainer />
      <Image source={require("./assets/cloud-menu.jpg")} />
    </QueryClientProvider>
  )
}

export default App
