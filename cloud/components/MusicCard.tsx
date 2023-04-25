import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import LinearProgress from '@mui/material/LinearProgress'
import useZusStore from '../data/zustand'

export default function MusicControlCard() {
  const { currentState } = useZusStore((state) => state)
  const theme = useTheme()
  const tracks = {
    awake: { title: 'Morning Light Breeze', artist: 'Noa Ivanovic', imageUrl: require('/assets/music/Morning.png') },
    bedtime: { title: 'Healing Sounds', artist: 'Pavithra', imageUrl: require('/assets/music/MeditationBowl.png') },
    hibernate: { title: '', artist: '', imageUrl: '' },
    home: { title: 'Sunflower', artist: 'Post Malone', imageUrl: require('/assets/music/SpideyVerse.png') }
  }
  return (
    <Card
      sx={{ backgroundColor: 'rgb(213,212,205)', width: '288px', height: '144px', borderRadius: '14px' }}
      elevation={0}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          {tracks[currentState].imageUrl && <CardMedia
            component='img'
            sx={{ width: '64px', height: '64px', marginRight: '7px' }}
            image={tracks[currentState].imageUrl || ''}
            alt={tracks[currentState].title}
          />}
          {!tracks[currentState].imageUrl && <Box sx={{ width: '64px', height: '64px', marginRight: '7px' }}
          />}
          <Box>

            <Typography component='div' variant='body2' noWrap sx={{ maxWidth: '160px' }}>
              {tracks[currentState].title}
            </Typography>
            <Typography variant='subtitle2' color='text.secondary' component='div' noWrap sx={{ maxWidth: '160px' }}>
              {tracks[currentState].artist}
            </Typography>
          </Box>
        </CardContent>
        <LinearProgress variant='determinate' value={70} sx={{
          width: '90%', marginLeft: '14px'
        }} />
        < Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-around'
        }}>
          < IconButton aria-label='previous'>
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label='play/pause'>
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label='next'>
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box >
    </Card >
  )
}
