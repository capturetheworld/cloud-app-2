import { create } from 'zustand'

export interface MainState {
  currentImageUrl: any
  currentImage: string
  imageList: { awake: string, bedtime: string, hibernate: string, home: string }
  SET_CURRENT_IMAGE: (image: any) => void
}


const imageList = { awake: require('/assets/Awaken.png'), bedtime: require('/assets/Bedtime.png'), hibernate: require('/assets/Hibernate.png'), home: require('/assets/Home.png') }



const useZusStore = create<MainState>((set) => ({
  currentImage: 'home',
  currentImageUrl: require('/assets/Awaken.png'),
  imageList: imageList,
  // @ts-ignore
  SET_CURRENT_IMAGE: (image: any) => set({ currentImageUrl: imageList[image], currentImage: image }),
}))

export default useZusStore