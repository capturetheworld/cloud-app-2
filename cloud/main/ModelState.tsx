import Image from 'mui-image'
import useZusStore from '../data/zustand'

const ModelState = () => {
  const { currentImageUrl } = useZusStore((state) => state)
  return (
    <Image src={currentImageUrl} duration={3100} />
  )
}
export default ModelState

