import { ToggleButtonGroup, ToggleButton, styled } from '@mui/material'
import useZusStore from '../data/zustand'
import { sendValue, roombaStart, roombaStop, roombaHome } from '../api/index.mjs'

const RightToggles = () => {
  const { icons, circuits } = useZusStore((state) => state)
  const buttonClick = (e, button) => {
    e.preventDefault()
    sendValue('button', circuits[button]?.value === 0 ? 100 : 0)
  }
  return (

    <ToggleButtonGroup
      sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      <StyledToggleButton value='bed' aria-label='toggle bed'
        onClick={(e) => { roombaStart() }}
        sx={{ backgroundColor: circuits.bed?.value ? 'white !important' : 'rgba(0,255,0,.3)' }}>
        <img src={icons.irobot} style={{ marginRight: '3.5px', marginBottom: '2px' }} />
      </ StyledToggleButton>

      <StyledToggleButton
        onClick={(e) => { roombaStop() }}
        sx={{ backgroundColor: circuits.irobot?.value ? 'white !important' : 'rgba(255,0,0,.3)' }}
        value='irobot' aria-label='toggle bed' size='small'>
        <img src={icons.irobot} style={{ marginRight: '3.5px', marginBottom: '2px' }} />
      </StyledToggleButton>

      <StyledToggleButton
        sx={{ backgroundColor: circuits.settings?.value ? 'white !important' : 'rgba(255,255,0,.3)' }}
        onClick={(e) => { roombaHome() }}
        value='setting' aria-label='toggle x' size='small'>
        <img src={icons.irobot} style={{ marginRight: '3.5px', marginBottom: '2px' }} />
      </StyledToggleButton>

      <StyledToggleButton
        value='more' aria-label='toggle xx' size='small'
        onClick={(e) => { buttonClick(e, 'more') }}
      >
        <img src={icons.settings} style={{ marginRight: '3.5px', marginBottom: '2px' }} />
      </StyledToggleButton>
    </ToggleButtonGroup >
  )
}

export default RightToggles

// 
// 
// 
const StyledToggleButton = styled(ToggleButton)(() => {

  return ({
    '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
      borderRadius: '8px !important',
      border: 'none',
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
