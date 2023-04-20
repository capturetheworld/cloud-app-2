import styled from '@emotion/styled'
import { Box } from '@mui/material'
import Image from 'mui-image'
import useZusStore from '../data/zustand'

const ModelState = (props) => {
  const { currentImageUrl } = useZusStore((state) => state)
  return (
    <Image src={currentImageUrl} duration={3100} />
  )
}
export default ModelState


const BackgroundImage = styled(Box)(() => ({
  backgroundColor: 'rgba(138,138,138,1)',
  width: "704px", height: "388px",
  display: "flex",
  alignSelf: "center",
}))