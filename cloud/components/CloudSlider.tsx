import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/joy/Slider'
import styled from '@emotion/styled'

export default function VerticalSlider() {
  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
    }
  }

  return (
    <Box sx={{ height: 300 }}>
      <StyledSlider
        color="danger"
        marks={false}
        orientation="vertical"
        size="lg"
        valueLabelDisplay="on"
        variant="plain"
        sx={{
          "--Slider-track-size": "21px",
          "--Slider-mark-size": "0px",
          "--Slider-thumb-size": "0px",
          "--Slider-thumb-width": "0px",
          "--Slider-valueLabel-arrowSize": "0px",
          backGroundColor: 'red'
        }}
      />
    </Box>
  )
}




const StyledSlider = styled(Slider)<any>(() => ({
  backgroundColor: '#D5D4CD',
  borderRadius: '14px',
  '& .MuiSlider-track': {
    backgroundColor: '#FFFFFF',
    borderRadius: '2px',
    width: '80%',
    maxHeight: '100%',
  },
  '& .MuiSlider-rail': {
    // backgroundColor: '#00FF00',
    borderRadius: '2px',
    width: '80%',
    maxHeight: '100%',
  },
  '& .MuiSlider-thumb': {
    backgroundColor: 'purple',
    borderRadius: '8px',
  },
}))