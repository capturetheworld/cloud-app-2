import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/joy/Slider'
import styled from '@emotion/styled'
import {useEffect} from 'react';
import {useCircuits, useSetCircuitLevel} from '../query'


interface VerticalSliderProps {
  valueLabelDisplay: boolean,
  circuitName: string,
  icon?: string,
  value?: number
}
export default function VerticalSlider({ valueLabelDisplay, icon, value }: Props) {
  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
    }
  }
  const [slidervalue, setSlidervalue] = React.useState(value || 100)
  React.useEffect(() => {
    setSlidervalue(value)
  }, [value])
  const onChange = (event, newValue) => {
    console.log('Slider value changed to', newValue)
    setSlidervalue(newValue)
  }
  console.log("RENDERING SLIDER", slidervalue)
  return (
    <Box sx={{ height: 308 }}>
      <StyledSlider
        // color="danger"
        icon={icon}
        marks={false}
        value={sliderValue}
        orientation="vertical"
        size="lg"
        value={slidervalue}
        onChange={onChange}
        valueLabelDisplay={"auto"}
        variant="plain"
        // onChangeCommitted={() => alert("Dang")}
        sx={{
          "--Slider-track-size": "21px",
          "--Slider-mark-size": "0px",
          "--Slider-thumb-size": "0px",
          "--Slider-thumb-width": "0px",
          "--Slider-valueLabel-arrowSize": "0px",
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
      marginTop: "3.5px",
      // backgroundColor: "#C5C4BD",
    },
    '& .MuiSlider-thumb': {
      width: "54px",
      height: "54px",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundColor: 'transparent',
      backgroundImage: `url(${prop.icon})`,
      marginBottom: `${(-prop.value * .5) + 21}px`,
      marginTop: "3.5px",
      '&::before': {
        border: 'none',
      }
    },

    '& .Mui-focusVisible': {
      border: "10px solid red",
      outline: 'none',
      outlineOffset: 'none',
    },
    '& .MuiSlider-slider': {
    },
  })
}
)