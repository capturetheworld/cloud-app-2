import { Box, ToggleButton, ToggleButtonGroup, Typography, styled } from '@mui/material'
import useZusStore from '../data/zustand'
import { setScene } from '../api/index.mjs'


const Controls = () => {
  const { SET_CURRENT_STATE, currentState, icons } = useZusStore((state) => state)

  const changeImage = (e: React.MouseEvent<HTMLElement>, state: any) => {
    if (state !== null) {
      SET_CURRENT_STATE(state) // <- this might be deletable
      setScene(state)
    }
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '14px' }}>
      <ToggleButtonGroup
        exclusive
        onChange={changeImage}
        value={currentState}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <StyledToggleButton value="home" aria-label='Home' selected={currentState === 'home'}
        >
          <img src={icons.home} style={{ marginRight: '3.5px', marginBottom: '2px' }} />
          <Typography>
            Home
          </Typography>
        </StyledToggleButton>
        <StyledToggleButton value="hibernate" aria-label='Away' selected={currentState === 'hibernate'}>
          <img src={icons.away} style={{ marginRight: '3.5px', marginBottom: '2px' }} />
          <Typography>
            Away
          </Typography>
        </StyledToggleButton>
        <StyledToggleButton value="bedtime" aria-label='Bedtime' selected={currentState === 'bedtime'}>
          <img src={icons.bedtime} style={{ marginRight: '3.5px', marginBottom: '2px' }} />
          <Typography>
            Bedtime
          </Typography>
        </StyledToggleButton>
        <StyledToggleButton sx={{ backgroundColor: currentState === 'awake' ? 'white' : '', borderRadius: '14px' }}
          value="awake" aria-label='Morning' selected={currentState === 'awake'}>
          <img src={icons.awake} style={{ marginRight: '3.5px', marginBottom: '2px' }} />
          <Typography>
            Morning
          </Typography>
        </StyledToggleButton>
        <ToggleButton onClick={(e) => e.preventDefault()} sx={{ opacity: 0, width: "50px" }} value="" aria-label='' selected={false} />
        <ToggleButton onClick={(e) => e.preventDefault()} sx={{ opacity: 0 }} value="" aria-label='' selected={false} />

      </ToggleButtonGroup>
    </Box >


  )
}

export default Controls


const StyledToggleButton = styled(ToggleButton)(() => ({
  '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
    borderRadius: '8px !important',
    border: 'none',
    width: '140px',
    height: '52px',
    backgroundColor: 'rgb(213,212,205)',
  }, '& .Mui-selected': {
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
    },
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'white',
    color: 'black',
  },
}))