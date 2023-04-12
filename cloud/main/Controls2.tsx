import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'
import CloudSlider from '../components/CloudSlider'
import BedOutlinedIcon from '@mui/icons-material/BedOutlined'
import NestCamWiredStandOutlinedIcon from '@mui/icons-material/NestCamWiredStandOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import MusicCard from '../components/MusicCard'
type Props = {}

const Controls2 = (props: Props) => {

  return (



    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "14px" }}>

      <CloudSlider />
      <CloudSlider />
      < Box sx={{
        display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"
      }
      }>
        <Button variant="contained" size="small">Climate Controls</Button>
        <MusicCard />
      </Box >
      <CloudSlider />

      <ToggleButtonGroup
        sx={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between",
        }}>
        <ToggleButton value="bed" aria-label='toggle bed' ><BedOutlinedIcon /></ ToggleButton>
        <ToggleButton value="bed" aria-label='toggle bed' size="small"><NestCamWiredStandOutlinedIcon /></ToggleButton>
        <ToggleButton value="bed" aria-label='toggle bed' size="small"><TuneOutlinedIcon /></ToggleButton>
        <ToggleButton value="bed" aria-label='toggle bed' size="small"><MoreHorizOutlinedIcon /></ToggleButton>
      </ToggleButtonGroup>

    </Box >


  )
}

export default Controls2