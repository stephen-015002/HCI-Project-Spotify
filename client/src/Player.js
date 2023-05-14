import { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({accessToken, trackUri}) {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])
    if(!accessToken) return null
  return <SpotifyPlayer
    token={accessToken}
    showSaveIcon
    callback={state => {
        if(!state.isPlaying) setPlay(false)
    }}
    play={play}
    uris={trackUri ? [trackUri] : []}
    styles={{
      trackArtistColor: '#D1D4C9',
      trackNameColor: "#D1D4C9",
      sliderColor: "#2F8886",
      sliderTrackColor: '#D1D4C9',
      loaderColor: "#2F8886",
      altColor: "#2F8886",
      color: "#2F8886",
      activeColor: "#2F8886",
      bgColor: '#141414'
    }}
  />
}
