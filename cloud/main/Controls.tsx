import { Box, Chip, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import useZusStore from '../data/zustand'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { setScene } from '../api'

type Props = {}

const Controls = (props: Props) => {
  const { SET_CURRENT_IMAGE, currentImageUrl, currentImage } = useZusStore((state) => state)

  const changeImage = (e: React.MouseEvent<HTMLElement>, image: any) => {
    if (image !== null) {
      SET_CURRENT_IMAGE(image)
      setScene(image)
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "14px" }}>
      <ToggleButtonGroup
        exclusive
        onChange={changeImage}
        value={currentImage}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
        <ToggleButton value="home" aria-label='Home' selected={currentImage === "home"}>
          <HomeOutlinedIcon /><Typography>
            Home
          </Typography>
        </ToggleButton>
        <ToggleButton value="hibernate" aria-label='Awayselected={currentImage==="hibernate"}'>
          <WorkOutlineOutlinedIcon /><Typography>
            Away
          </Typography>
        </ToggleButton>
        <ToggleButton value="bedtime" aria-label='Bedtime' selected={currentImage === "bedtime"}>
          <DarkModeOutlinedIcon /><Typography>
            Bedtime
          </Typography>
        </ToggleButton>
        <ToggleButton value="awake" aria-label='Morning' selected={currentImage === "awake"}>
          <LightModeOutlinedIcon /><Typography>
            Morning
          </Typography>
        </ToggleButton>
        {/* <Box sx={{ visibility: "hidden" }}>Nothing</Box> */}
      </ToggleButtonGroup>
    </Box>


  )
}

export default Controls