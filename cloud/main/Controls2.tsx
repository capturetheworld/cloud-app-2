import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloudSlider from '../components/CloudSlider'
import MusicCard from '../components/MusicCard'
import useZusStore from '../data/zustand'
import ClimateControls from '../components/ClimateControls'
import RightToggles from '../components/RightToggles'

const Controls2 = () => {
  const { currentState, icons } = useZusStore((state) => state)
  const [ceilingLight, setCeilingLight] = useState(0)
  const [coveLights, setCoveLights] = useState(0)
  const [blinds, setBlinds] = useState(0)

  useEffect(() => {
    switch (currentState) {
      case "home":
        setCeilingLight(100)
        setCoveLights(100)
        setBlinds(0)
        break
      case "hibernate":
        setCeilingLight(0)
        setCoveLights(0)
        setBlinds(100)
        break
      case "bedtime":
        setCeilingLight(0)
        setCoveLights(100)
        setBlinds(100)
        break
      case "awake":
        setCeilingLight(0)
        setCoveLights(100)
        setBlinds(0)
        break
    }

  }, [currentState])

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "14px" }}>

      <CloudSlider valueLabelDisplay={false} icon={icons.ceiling} value={ceilingLight} />
      <CloudSlider valueLabelDisplay={false} icon={icons.cove} value={coveLights} />
      < Box sx={{
        display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"
      }
      }>
        <ClimateControls />
        <MusicCard />
      </Box >
      <CloudSlider valueLabelDisplay={false} icon={icons.blinds} value={blinds} />
      <RightToggles />

     

    </Box >


  )
}

export default Controls2

