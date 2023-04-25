import { Box, Card, Typography } from '@mui/material'
import useZusStore from '../data/zustand'
import { useState } from 'react'


const ClimateControls = () => {
  const { icons } = useZusStore()
  const { minus, plus } = icons
  const [temp, setTemp] = useState(66)
  const handleMinus = () => {
    setTemp(temp - 1)
  }
  const handlePlus = () => {
    setTemp(temp + 1)
  }
  return (

    <Card
      sx={{
        backgroundColor: 'rgb(213,212,205)',
        width: '288px',
        height: '144px',
        borderRadius: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: '14px',
        alignItems: 'center'
      }}
      elevation={0}
    >
      <Box sx={{ width: '100%', marginTop: '10px' }}>
        <Typography variant='caption' sx={{ textAlign: 'left', marginLeft: '16px' }}>
          Temperature <b>65°F</b>
        </Typography>
      </Box>


      {/* CONTROLS */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'space-between'
        }}
      >
        {/* MINUS button */}
        <Box sx={{
          ...buttonStyle,
          marginRight: '16px',
          backgroundImage: `url(${minus})`,
        }} onClick={e => {
          e.preventDefault()
          handleMinus()
        }}
        />
        <Box >

          {/* Temp Control */}
          <Typography variant='h3'>
            {`${temp}°F`}
          </Typography>
        </Box>

        {/* PLUS button */}
        <Box
          onClick={e => {
            e.preventDefault()
            handlePlus()
          }}
          sx={{
            ...buttonStyle,
            marginLeft: '16px',
            backgroundImage: `url(${plus})`,
          }} />
      </Box>

      <Box />
    </Card >)
}

export default ClimateControls


const buttonStyle = {
  width: '32px',
  height: '32px',
  marginTop: '10px',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
}
