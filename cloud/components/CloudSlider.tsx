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
}
export default function VerticalSlider({ valueLabelDisplay, circuitName}: VerticalSliderProps) {

  const {data: circuits} = useCircuits();

  
  const circuit = circuits.find(c => c.name === circuitName);
  const {mutate: setCircuitLevel} =  useSetCircuitLevel(circuitName); //returns a mutate object
  let sliderValue = (circuit?.state?.level ?? 0)/255*100;

  // console.log('CHECKPOINT ============' , circuit?.name ,circuit?.state.level, sliderValue);

  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
    }
  }
  const icon = require('/assets/adaptive-icon.png')
  // console.log("ICON", icon)


  const onChange = (event, newValue) => {
    console.log('Slider value changed to', newValue)
    setCircuitLevel(newValue);
    sliderValue=newValue;
  }
  const onChangeCommitted = (event, newValue) => {
    console.log('Slider value changed to', newValue)
    setCircuitLevel(newValue);
    sliderValue=newValue;
  }

  return (
    <Box sx={{ height: 300 }}>
      <StyledSlider
        // color="danger"
        icon={icon}
        marks={false}
        value={sliderValue}
        orientation="vertical"
        size="lg"
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
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