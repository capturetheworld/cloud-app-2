import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/joy/Slider'
import styled from '@emotion/styled'


interface Props {
  valueLabelDisplay: boolean,
  icon?: string,
}
export default function VerticalSlider({ valueLabelDisplay }: Props) {
  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
    }
  }
  const icon = require('/assets/adaptive-icon.png')
  console.log("ICON", icon)
  const [sliderValue, setSliderValue] = React.useState(0)

  const onChange = (event, newValue) => {
    console.log('Slider value changed to', newValue)
    setSliderValue(newValue)
  }
  return (
    <Box sx={{ height: 300 }}>
      <StyledSlider
        // color="danger"
        icon={icon}
        marks={false}
        orientation="vertical"
        size="lg"
        sliderValue={sliderValue}
        onChange={onChange}
        valueLabelDisplay={valueLabelDisplay ? "on" : "off"}
        variant="plain"
        sx={{
          "--Slider-track-size": "21px",
          "--Slider-mark-size": "0px",
          "--Slider-thumb-size": "0px",
          "--Slider-thumb-width": "0px",
          "--Slider-valueLabel-arrowSize": "0px",
          backGroundColor: 'red',
          borderRadius: '14px',
        }}
      />
    </Box>
  )
}




const StyledSlider = styled(Slider, {
  shouldForwardProp: (prop) => prop !== 'valueLabelDisplay'
})<any>((prop) => {
  return ({
    backgroundColor: '#D5D4CD',
    borderRadius: '14px',
    width: "70px",
    '& .MuiSlider-track': {
      backgroundColor: "#FFFFFF",
      borderRadius: "12px",
      width: "80%",
      maxHeight: "97%",
      marginBottom: "3.5px",
      marginTop: "3.5px"
    },
    '& .MuiSlider-rail': {
      borderRadius: "12px",
      width: "80%",
      maxHeight: "97%",
      marginBottom: "3.5px",
      marginTop: "3.5px"
    },
    '& .MuiSlider-thumb': {
      backgroundColor: 'transparent',
      border: 'none',
      backgroundImage: `url(${prop.icon})`,
      marginBottom: `${(-prop.sliderValue * .5) + 21}px`,
      marginTop: "3.5px",
    },
    '& .MuiSlider-slider': {
    },
  })
}
)