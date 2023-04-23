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
    'ceilingLights',
    'coveLights',
    'blinds',
    'bed',
    'irobot',
    'settings',
    'more',
    'temperature',
    'home',
    'away',
    'bedtime',
    'awake']

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