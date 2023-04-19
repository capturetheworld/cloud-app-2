import { ToggleButtonGroup, ToggleButton, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useZusStore from '../data/zustand'

type Props = {}

const RightToggles = (props: Props) => {

  const { currentState, buttonsClicked, icons, SET_BUTTON_CLICKED } = useZusStore((state) => state)

  return (

    <ToggleButtonGroup
      sx={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between",
      }}
    >
      <StyledToggleButton value="bed" aria-label='toggle bed'
        onClick={(e) => { e.preventDefault(); SET_BUTTON_CLICKED("bed") }}
        sx={{ backgroundColor: buttonsClicked.bed ? "white !important" : '' }}>
        <img src={icons.bed} style={{ marginRight: "3.5px", marginBottom: "2px" }} />
      </ StyledToggleButton>

      <StyledToggleButton
        onClick={(e) => { e.preventDefault(); SET_BUTTON_CLICKED("irobot") }}
        sx={{ backgroundColor: buttonsClicked.irobot ? "white" : "" }}
        value="irobot" aria-label='toggle bed' size="small">
        <img src={icons.irobot} style={{ marginRight: "3.5px", marginBottom: "2px" }} />
      </StyledToggleButton>

      <StyledToggleButton
        sx={{ backgroundColor: buttonsClicked.settings ? "white" : "" }}

        value="setting" aria-label='toggle x' size="small">
        <img src={icons.settings} style={{ marginRight: "3.5px", marginBottom: "2px" }} />
      </StyledToggleButton>

      <StyledToggleButton value="more" aria-label='toggle xx' size="small">
        <img src={icons.more} style={{ marginRight: "3.5px", marginBottom: "2px" }} />
      </StyledToggleButton>
    </ToggleButtonGroup >
  )
}

export default RightToggles




const StyledToggleButton = styled(ToggleButton)((props) => {

  return ({
    '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
      borderRadius: '8px !important',
      border: "none",
      // }, '& .Mui-selected': {
      //   backgroundColor: 'white',
      //   color: 'black',
      //   '&:hover': {
      //     backgroundColor: 'white',
      //     color: 'black',
      //   },
      // },
      // '&.Mui-selected:hover': {
      //   backgroundColor: 'white',
      //   color: 'black',
      // 
    },
  })
})