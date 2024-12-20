import { useState, useEffect} from 'react'
import useAuth from './useAuth'
import Player from './Player'
import TrackSearchResult from './TrackSearchResult'
import TopTracks from './TopTracks'
import ScatterplotDemo from './ScatterplotDemo'
import {Button, Container, Form, Row, Nav, Navbar} from 'react-bootstrap'
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
    const [trackAnalytics, setTrackAnalytics] = useState([])

    function chooseTrack(track) {
        setPlayingTrack(track)
    }

    function handleLogout() {
        sessionStorage.removeItem(accessToken)
        sessionStorage.removeItem(code)
        window.location.reload()
    }
    function addToTopTracks(track) {
        var tempTracks = topTracks;
        tempTracks.push(track)
        setTopTracks(tempTracks)
        setSearch('')
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
    }

    function emptyTopTracks() {
        setTopTracks([])
    }

    function resetTopTracks() {
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
                    color: "#2F8886"
                }
            }))
        })
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
                    color: "#2F8886"
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
                    albumUrl: smallestAlbumImage.url,
                    id: track.id,
                    color: "#D1D4C9"
                }
            }))
        })
        return () => cancel = true
    }, [search, accessToken])

    useEffect(() => {
        if(topTracks === []) return
        if(trackFeatures === []) return
        setTrackAnalytics(topTracks.map((x, i) => [x, trackFeatures[i]]))

    }, [topTracks, trackFeatures])


  return (
    <div style={{backgroundColor: '#141414'}}>
    <Container className="d-flex flex-column py-2" style={{height: '100vh'}}>
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand> Supported by Spotify Web API</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
            </Nav>
            <Form className="d-flex">
                <Form.Control type='search' placeholder='Search Songs/Artists' className="me-2" value={search} onChange={e => setSearch(e.target.value)}/>
                <Button id='logout-button' variant="outline-success" onClick={handleLogout}> Logout </Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        
        <div className='flex-grow-1 my-2' style={{overflowY: 'auto'}}>
            {searchResults.map(track => (
                <TrackSearchResult 
                track={track} 
                key={track.uri} 
                addToTopTracks={addToTopTracks}/>
            ))}
            {searchResults.length === 0 && (
                <>
                <h1 style={{color: '#D1D4C9'}}> My Track Analytics</h1>
                <div>
                    <ScatterplotDemo tracks={trackAnalytics} emptyTopTracks={emptyTopTracks} resetTopTracks={resetTopTracks} chooseTrack={chooseTrack}/>
                </div>
                </>
            )}
            {searchResults.length === 0 && ( <>
                <div>
                    <h1 style={{color: '#D1D4C9'}}> My Top Tracks</h1>
                </div>
                <Row xs={1} md={5} className="g-4">
                        {trackAnalytics.map(track => (
                            <TopTracks
                            track={track}
                            chooseTrack={chooseTrack}
                            />
                        ))}
                </Row>
                </>
            )}
        </div>
        <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
    </Container>
    </div>
  )
}
