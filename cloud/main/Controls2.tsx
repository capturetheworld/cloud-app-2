import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloudSlider from '../components/CloudSlider'
import BedOutlinedIcon from '@mui/icons-material/BedOutlined'
import NestCamWiredStandOutlinedIcon from '@mui/icons-material/NestCamWiredStandOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import MusicCard from '../components/MusicCard'
import useZusStore from '../data/zustand'
type Props = {}

const Controls2 = (props: Props) => {
  const { currentState } = useZusStore((state) => state)
  const icons = {
    ceiling: require('/assets/sliders/ceiling-light.png'),
    cove: require('/assets/sliders/cove-lights.png'),
    blinds: require('/assets/sliders/blinds.png'),
    bed: require('/assets/external/bed-line_sharp.png'),
    irobot: require('/assets/external/irobot.png'),
    settings: require('/assets/external/settings.png'),
    more: require('/assets/external/more-line_sharp.png')
  }
  const [ceilingLight, setCeilingLight] = useState(0)
  const [coveLights, setCoveLights] = useState(0)
  const [blinds, setBlinds] = useState(0)
  const [bed, setBed] = useState(false)
  const [irobot, setIrobot] = useState(false)
  const [settings, setSettings] = useState(false)
  const [more, setMore] = useState(false)

  useEffect(() => {
    switch (currentState) {
      case "home":
        setCeilingLight(100)
        setCoveLights(100)
        setBlinds(0)
        setIrobot(false)
        setBed(false)
        setSettings(false)
        setMore(false)
        break
      case "hibernate":
        setCeilingLight(0)
        setCoveLights(0)
        setBlinds(100)
        setIrobot(true)
        setBed(false)
        setSettings(false)
        setMore(false)
        break
      case "bedtime":
        setCeilingLight(0)
        setCoveLights(100)
        setBlinds(100)
        setIrobot(false)
        setBed(true)
        setSettings(false)
        setMore(false)
        break
      case "awake":
        setCeilingLight(0)
        setCoveLights(100)
        setBlinds(0)
        setIrobot(false)
        setBed(true)
        setSettings(false)
        setMore(false)
        break
    }

  }, [currentState])
  console.log(currentState, ceilingLight, coveLights, blinds)

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "14px" }}>

      <CloudSlider valueLabelDisplay={false} icon={icons.ceiling} value={ceilingLight} />
      <CloudSlider valueLabelDisplay={false} icon={icons.cove} value={coveLights} />
      < Box sx={{
        display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"
      }
      }>
        <Button variant="contained" size="small">Climate Controls</Button>
        <MusicCard />
      </Box >
      <CloudSlider valueLabelDisplay={false} icon={icons.blinds} value={blinds} />

      <ToggleButtonGroup
        sx={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between",
        }}>
        <ToggleButton value="bedtime" aria-label='toggle bed'
          sx={{ backgroundColor: bed ? "white" : "" }}
        >
          <img src={icons.bed} style={{ marginRight: "3.5px", marginBottom: "2px" }} />
        </ ToggleButton>
        <ToggleButton sx={{ backgroundColor: irobot ? "white" : "" }}
          value="away" aria-label='toggle bed' size="small">
          <img src={icons.irobot} style={{ marginRight: "3.5px", marginBottom: "2px" }} />
        </ToggleButton>
        <ToggleButton sx={{ backgroundColor: settings ? "white" : "" }}

          value="x" aria-label='toggle x' size="small">
          <img src={icons.settings} style={{ marginRight: "3.5px", marginBottom: "2px" }} />
        </ToggleButton>
        <ToggleButton value="xx" aria-label='toggle xx' size="small">
          <img src={icons.more} style={{ marginRight: "3.5px", marginBottom: "2px" }} />
        </ToggleButton>
      </ToggleButtonGroup>

    </Box >


  )
}

export default Controls2

