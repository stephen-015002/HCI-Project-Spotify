import { useState, useEffect } from 'react'
import useAuth from './useAuth'
import Player from './Player'
import TrackSearchResult from './TrackSearchResult'
import TopTracks from './TopTracks'
import {Button, Container, Form} from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
    clientId: '5b211a2d15e54da686a08946810f4947'
})

export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")
    const [topTracks, setTopTracks] = useState([])
    const [trackFeatures, setTrackFeatures] = useState([])

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
    }
    function handleLogout() {
        sessionStorage.removeItem(accessToken)
        sessionStorage.removeItem(code)
        window.location.reload()
    }
    
    useEffect(() => {
        if(!playingTrack) return

        axios.get('http://localhost:3001/lyrics', {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })
    }, [playingTrack])

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.getMyTopTracks({limit: 50}).then(res => {
            setTopTracks(res.body.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url,
                    id: track.id,
                }
            }))
        })
    }, [accessToken])

    useEffect(() => {
        if(!accessToken) return
        if(topTracks === []) return
        spotifyApi.getAudioFeaturesForTracks(topTracks.map(track => track.id)).then(res => {
            setTrackFeatures(res.body.audio_features.map(track => {
                return {
                    id: track?.id,
                    acousticness: track?.acousticness,
                    danceability: track?.danceability,
                    energy: track?.energy,
                    valence: track?.valence

                }
            }))
        })
    }, [accessToken, topTracks])

    useEffect(() => {
        if(!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })
        return () => cancel = true
    }, [search, accessToken])


  return (
    <Container className="d-flex flex-column py-2" style={{height: '100vh'}}>
        <Form.Control type='search' placeholder='Search Songs/Artists' value={search} onChange={e => setSearch(e.target.value)} />
        <Button id='logout-button' onClick={handleLogout}> Logout </Button>
        <div className='flex-grow-1 my-2' style={{overflowY: 'auto'}}>
            {searchResults.map(track => (
                <TrackSearchResult 
                track={track} 
                key={track.uri} 
                chooseTrack={chooseTrack}/>
            ))}
            {searchResults.length === 0 && (
                <div className="text-center" style={{whiteSpace: "pre"}}>
                        {topTracks.map((x, i) => [x, trackFeatures[i]]).map(track => (
                            <TopTracks
                            track={track}
                            />
                        ))}
                    </div>
            )}
        </div>
        <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
    </Container>
  )
}
