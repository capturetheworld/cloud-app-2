import { Box, Card, Container } from '@mui/material'
import ClockWidget from '../components/ClockWidget'
import Controls from './Controls'
import Controls2 from './Controls2'
import ModelState from './ModelState'
import { subscribeValue } from '../api/index.mjs'
import useZusStore from '../data/zustand'

const CloudOSContainer = () => {
  const { SET_REALTIME_STATE } = useZusStore()
  const circuits = [
    'C7', //C7 ?? - ceilingLgithgs
    'C8', //C8 - coveLights
    'C11', //C11 - 0 closed, anything else open - TOGGLE NOT SLIDER
    // 'bed', //cant control
    // 'irobot', //two buttons at least - states : off, go. home
    // 'settings', //clarification needed
    // 'more',
    // 'temperature', //no temperature control
    // 'home',
    // 'away', //hibernate turn things off quickly
    // 'bedtime', //turn many things off slowly, dim other things
    // 'awake'
  ]

  // CONNECT TO API
  circuits.map((circuit) => {
    subscribeValue(circuit,
      (data: any) => {
        SET_REALTIME_STATE({ circuit, data })
      })
  })
  return (
    <Container fixed sx={{
      backgroundColor: 'rgb(176,176,170)',
      width: '768px', height: '1024px',
      maxWidth: '768px', maxHeight: '1024px',
      minWidth: '768px', minHeight: '1024px',
    }}
    >
      <Card
        sx={{
          width: '704px', height: '960px',
          maxWidth: '704px', maxHeight: '960px',
          minWidth: '704px', minHeight: '960px',
          marginTop: '32px',
          backgroundColor: 'rgba(227,226,222)',
          borderRadius: '32px'
        }}
        elevation={0}
      >

        <Box sx={{ textAlign: 'right' }}><ClockWidget /></Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '7px',
        }}>

          <Box sx={{ display: 'flex', alignItems: 'cneter', justifyContent: 'center' }}><ModelState /></Box>
          <Box sx={{ width: '100%' }}><Controls /></Box>
          <Box sx={{ width: '100%' }}><Controls2 /></Box>
        </Box>

      </Card>
    </Container>
  )
}

export default CloudOSContainer