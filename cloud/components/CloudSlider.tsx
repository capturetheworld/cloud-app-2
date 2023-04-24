import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/joy/Slider'
import styled from '@emotion/styled'


interface Props {
  valueLabelDisplay: boolean,
  icon?: string,
  value?: number
  circuit: string
  onValueChange: (circuit: string, value: number) => void
}
export default function VerticalSlider({ icon, value, circuit, onValueChange, }: Props) {
  const [thumbValue, setThunbValue] = React.useState(0)
  const onChange = (_event: any, newValue: number) => {
    setThunbValue(newValue)
  }
  const onChangeCommitted = (_event: any, newValue: number) => {
    onValueChange(circuit, newValue)
  }
  console.log(thumbValue)
  return (
    <Box sx={{ height: 308 }}>
      <StyledSlider
        icon={icon}
        marks={false}
        orientation="vertical"
        size="lg"
        value={value || 0}
        thumbvalue={thumbValue || 0}
        onChange={onChange}
        valueLabelDisplay={'auto'}
        variant="plain"
        onChangeCommitted={onChangeCommitted}
        sx={{
          '--Slider-track-size': '21px',
          '--Slider-mark-size': '0px',
          '--Slider-thumb-size': '0px',
          '--Slider-thumb-width': '0px',
          '--Slider-valueLabel-arrowSize': '0px',
          borderRadius: '14px',
        }}
      />
    </Box>
  )
}




const StyledSlider = styled(Slider, {
  shouldForwardProp: (props) => props !== 'valueLabelDisplay'
})<any>((props) => {
  let thumbValue = props.thumbvalue || 0
  if (thumbValue > 100) thumbValue = 100
  if (thumbValue < 0) thumbValue = 0
  return ({
    backgroundColor: '#D5D4CD',
    borderRadius: '14px',
    width: '70px',
    '& .MuiSlider-track': {
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      width: '83%',
      maxHeight: '97%',
      marginBottom: '4px',
      marginTop: '3.5px'
    },
    '& .MuiSlider-rail': {
      borderRadius: '12px',
      width: '58px',
      maxHeight: '97%',
      marginBottom: '7px',
      marginTop: '3.5px',
      backgroundColor: 'rgb(213,212,205)',
    },
    '& .MuiSlider-thumb': {
      width: '54px',
      height: '54px',
      bottom: `${thumbValue}% !important`,
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundColor: 'transparent',
      backgroundImage: `url(${props.icon})`,
      marginBottom: `${(-props.value * .5) + 21}px`,
      marginTop: '3.5px',
      '&::before': {
        border: 'none',
      }
    },

    '& .Mui-focusVisible': {
      outline: 'none',
      outlineOffset: 'none',
    },
    '& .MuiSlider-slider': {
    },
  })
}
)