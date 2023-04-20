import { Box, Card, CardHeader, Typography } from '@mui/material'
import React from 'react'
import useZusStore from '../data/zustand'

type Props = {}

const ClimateControls = (props: Props) => {
  const { icons, circuits } = useZusStore()
  const { minus, plus } = icons
  return (

    <Card
      sx={{
        backgroundColor: 'rgb(213,212,205)',
        width: "288px",
        height: "144px",
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: "14px",
        alignItems: "center"
      }}
      elevation={0}
    >
      <Box sx={{ width: "100%", marginTop: "10px" }}>
        <Typography variant="caption" sx={{ textAlign: "left", marginLeft: "16px" }}>
          Temperature <b>65°F</b>
        </Typography>
      </Box>


      {/* CONTROLS */}
      <Box
        onClick={e => {
          e.preventDefault()
          alert("DOWN")
        }}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "space-between"
        }}
      >
        {/* MINUS button */}
        <Box sx={{
          ...buttonStyle,
          marginRight: "16px",
          backgroundImage: `url(${minus})`,
        }} />
        <Box >

          {/* Temp Control */}
          <Typography variant="h3">
            75°F
          </Typography>
        </Box>

        {/* PLUS button */}
        <Box
          onClick={e => {
            e.preventDefault()
            alert("UP")
          }}
          sx={{
            ...buttonStyle,
            marginLeft: "16px",
            backgroundImage: `url(${plus})`,
          }} />
      </Box>

      <Box />
    </Card >)
}

export default ClimateControls


const buttonStyle = {
  width: "32px",
  height: "32px",
  marginTop: "10px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
}