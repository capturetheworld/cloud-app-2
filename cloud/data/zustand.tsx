import { create } from 'zustand'

export interface MainState {
  currentImageUrl: any
  currentState: string
  imageList: { awake: string, bedtime: string, hibernate: string, home: string },
  icons: {
    home: string
    away: string
    bedtime: string
    awake: string
    minus: string
    plus: string
    ceiling: string
    cove: string
    blinds: string
    bed: string
    irobot: string
    settings: string
    more: string
  },
  buttonsClicked: {
    bed: boolean,
    irobot: boolean,
    settings: boolean,
    more: boolean
  },

  SET_CURRENT_STATE: (appState: any) => void
  SET_REALTIME_STATE: (appState: any) => void
  SET_BUTTON_CLICKED: (button: any) => void

}

const imageList = {
  awake: require('/assets/Awaken.png'),
  bedtime: require('/assets/Bedtime.png'),
  hibernate: require('/assets/Hibernate.png'),
  home: require('/assets/Home.png'),
}

const useZusStore = create<MainState>((set) => ({
  currentState: 'home',
  currentImageUrl: require('/assets/Awaken.png'),
  imageList: imageList,
  icons: {
    home: require('/assets/buttons/home.png'),
    away: require('/assets/buttons/away.png'),
    bedtime: require('/assets/buttons/moon.png'),
    awake: require('/assets/buttons/morning.png'),
    minus: require("/assets/minus.png"),
    plus: require("/assets/plus.png"),
    ceiling: require('/assets/sliders/ceiling-light.png'),
    cove: require('/assets/sliders/cove-lights.png'),
    blinds: require('/assets/sliders/blinds.png'),
    bed: require('/assets/external/bed-line_sharp.png'),
    irobot: require('/assets/external/irobot.png'),
    settings: require('/assets/external/settings.png'),
    more: require('/assets/external/more-line_sharp.png')
  },
  buttonsClicked: {
    bed: false,
    irobot: false,
    settings: false,
    more: false
  },
  // @ts-ignore
  SET_CURRENT_STATE: (appState: any) => {
    return set((state) => {
      const buttonsClicked = state.buttonsClicked
      for (let button in buttonsClicked) {
        buttonsClicked[button] = false
      }
      switch (appState) {
        case 'away':
          buttonsClicked.irobot = true
          break
        case 'hibernate':
          buttonsClicked.irobot = true
          break
        case 'bedtime':
          buttonsClicked.bed = true
          break
        case 'awake':
          buttonsClicked.bed = true
      }

      return { currentImageUrl: imageList[appState], currentState: appState, buttonsClicked }
    })
  },


  SET_BUTTON_CLICKED: (button: any) => {
    return set((state) => {
      const buttonsClicked = state.buttonsClicked
      buttonsClicked[button] = true
      console.log(button, buttonsClicked)
      return { buttonsClicked }
    })
  },

  SET_REALTIME_STATE: (appState: any) => {
    console.log("SET_REALTIME_STATE", appState)
  }
}))

export default useZusStore