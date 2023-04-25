import { Box } from '@mui/material'
import React from 'react'
import CloudSlider from '../components/CloudSlider'
import MusicCard from '../components/MusicCard'
import useZusStore from '../data/zustand'
import ClimateControls from '../components/ClimateControls'
import RightToggles from '../components/RightToggles'
import { sendValue } from '../api/index.mjs'
const Controls2 = () => {
  const { icons, circuits } = useZusStore((state) => state)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '14px' }}>
      <CloudSlider
        valueLabelDisplay={false}
        icon={icons.ceiling}
        circuit="C7"
        value={circuits['C7']?.value}
        onValueChange={sendValue}
      />
      <CloudSlider
        valueLabelDisplay={false}
        icon={icons.cove}
        value={circuits['C8']?.value} circuit="C8"
        // value={circuits.coveLights?.value || currentSliderValue} circuit="coveLights"
        onValueChange={sendValue}
      />

      < Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        <ClimateControls />
        <MusicCard />
      </Box >

      <CloudSlider
        valueLabelDisplay={false}
        icon={icons.blinds}
        value={circuits['C11']?.value}
        circuit="C11"
        toggleThreshold={1}
        // value={circuits.blinds?.value || currentSliderValue} circuit="blinds"
        onValueChange={sendValue}
      />
      <RightToggles />
    </Box >
  )
}

export default Controls2

