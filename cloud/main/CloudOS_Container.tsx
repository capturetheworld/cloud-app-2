import { Box, Card, Container, Grid, Paper, Stack, styled } from "@mui/material"
import ClockWidget from "../components/ClockWidget"
import useZusStore from "../data/zustand"
import Controls from "./Controls"
import Controls2 from "./Controls2"
import ModelState from "./ModelState"

type Props = {}

const CloudOSContainer = (props: Props) => {

  return (
    <Container fixed sx={{
      backgroundColor: 'rgb(138, 138, 138)', width: "100vw", height: "100vh",
    }}
    >
      <Card sx={{ paddingTop: "21px", backgroundColor: "rgba(255,255,255,.4)" }}>

        <Box sx={{ textAlign: "right" }}><ClockWidget /></Box>

        <Box sx={{
          display: "flex",
          flexDirection: "column",
          padding: "7px",
        }}>


          <Box sx={{ display: "flex", alignItems: "cneter", justifyContent: "center" }}><ModelState /></Box>
          <Box sx={{ width: "100%" }}><Controls /></Box>
          <Box sx={{ width: "100%" }}><Controls2 /></Box>
        </Box>

      </Card>
    </Container>
  )
}

export default CloudOSContainer


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
