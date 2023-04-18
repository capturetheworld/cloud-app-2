import { Box, Chip, ToggleButton, ToggleButtonGroup, Typography, styled } from '@mui/material'
import useZusStore from '../data/zustand'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { setScene } from '../api'

type Props = {}

const Controls = (props: Props) => {
  const { SET_CURRENT_STATE, currentImageUrl, currentState } = useZusStore((state) => state)

  const changeImage = (e: React.MouseEvent<HTMLElement>, state: any) => {
    if (state !== null) {
      SET_CURRENT_STATE(state)
      setScene(state)
    }
  }
  const icons = {
    home: require('/assets/buttons/home.png'),
    away: require('/assets/buttons/away.png'),
    bedtime: require('/assets/buttons/moon.png'),
    awake: require('/assets/buttons/morning.png'),
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "14px" }}>
      <ToggleButtonGroup
        exclusive
        onChange={changeImage}
        value={currentState}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
        <StyledToggleButton value="home" aria-label='Home' selected={currentState === "home"}
          sx={{ backgroundColor: currentState === "home" ? "white" : "" }}
        >
          <img src={icons.home} style={{ marginRight: "3.5px", marginBottom: "2px" }} />
          <Typography>
            Home
          </Typography>
        </StyledToggleButton>
        <StyledToggleButton value="hibernate" aria-label='Away' selected={currentState === "hibernate"}>
          <img src={icons.away} style={{ marginRight: "3.5px", marginBottom: "2px" }} />
          <Typography>
            Away
          </Typography>
        </StyledToggleButton>
        <StyledToggleButton value="bedtime" aria-label='Bedtime' selected={currentState === "bedtime"}>
          <img src={icons.bedtime} style={{ marginRight: "3.5px", marginBottom: "2px" }} />
          <Typography>
            Bedtime
          </Typography>
        </StyledToggleButton>
        <StyledToggleButton sx={{ backgroundColor: currentState === "awake" ? "white" : "" }}
          value="awake" aria-label='Morning' selected={currentState === "awake"}>
          <img src={icons.awake} style={{ marginRight: "3.5px", marginBottom: "2px" }} />
          <Typography>
            Morning
          </Typography>
        </StyledToggleButton>
        <StyledToggleButton onClick={(e) => e.preventDefault()} sx={{ opacity: 0 }} value="" aria-label='' selected={false}></StyledToggleButton>
      </ToggleButtonGroup>
    </Box>


  )
}

export default Controls

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '& .Mui-selected': {
    color: "black",
    backgroundColor: "white",
    '&:hover': {
      backgroundColor: "white",
    },
  },
}))