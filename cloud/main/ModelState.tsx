import styled from '@emotion/styled'
import { Box } from '@mui/material'
import Image from 'mui-image'
// import { Image } from 'react-native'

// import { Image } from 'expo-image'

import useZusStore from '../data/zustand'


type Props = {}

const ModelState = (props: Props) => {
  const { currentImageUrl } = useZusStore((state) => state)
  return (
    <Image src={currentImageUrl} duration={3100} />
  )
}

export default ModelState


const BackgroundImage = styled(Box)(() => ({
  backgroundColor: 'rgba(138,138,138,1)',
  width: "80%",
  display: "flex",
  alignSelf: "center",
}))