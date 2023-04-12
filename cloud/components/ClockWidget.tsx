import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Image from 'mui-image'

type Props = {}

const ClockWidget = (props: Props) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const [currentTime, setCurrentTime] = useState<any>('')
  const [currentDate, setCurrentDate] = useState<any>('')

  const weatherApi = '5bdd307cffd3143892003f9b005f4ead'
  const weatherProps = {
    lat: 37.3387,
    lon: -121.8853,
    units: 'imperial',
    appid: weatherApi
  }

  // https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
  // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${weatherProps.lat}&lon=${weatherProps.lon}&exclude=minutely,hourly,alerts&units=${weatherProps.units}&appid=${weatherApi}`
  const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${weatherProps.lat}&lon=${weatherProps.lon}&exclude=minutely,hourly,daily,alert&appid=${weatherApi}&units=${weatherProps.units}`
  const { data: weatherData } = useQuery('weather', () =>
    fetch(weatherUrl).then(res =>
      res.json()
    )
  )

  useEffect(() => {
    const dateTimer = setInterval(() => {
      const today = new Date()

      const dayOfWeekAbbreviated = daysOfWeek[today.getDay()]
      const monthAbbreviated = months[today.getMonth()]
      const dayOfMonth = today.getDate()

      const currentDate = `${dayOfWeekAbbreviated}, ${monthAbbreviated} ${dayOfMonth}`
      const hours = today.getHours()
      const minutes = today.getMinutes()
      const ampm = hours >= 12 ? 'PM' : 'AM'

      const formattedHours = hours % 12 || 12
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

      const currentTime = `${formattedHours}:${formattedMinutes}:${today.getSeconds()} ${ampm} `


      setCurrentTime(currentTime)
      setCurrentDate(currentDate)

    }, 1000)
    return () => {
      clearInterval(dateTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ paddingRight: "14px" }}>
      <Box>
        <Typography>
          {currentDate}
        </Typography>
      </Box>
      <Box>
        <Typography variant='h5'>
          {currentTime}
        </Typography>

      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'flex-end', alignItems: "Center" }}>
        {weatherData && <Image src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`} width={'28px'} />}
        {weatherData && `${Math.round(weatherData.current.temp)}°F`}</Box>

    </Box>
  )
}

export default ClockWidget



//onecall?lat=${weatherProps.lat}&lon=${weatherProps.lon}&exclude=minutely,hourly,alerts&units=${weatherProps.units}&