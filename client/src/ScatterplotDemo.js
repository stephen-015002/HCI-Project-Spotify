import { useState, useEffect } from 'react'
import Scatterplot from './Scatterplot'
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap'


export default function ScatterplotDemo( {tracks, chooseTrack, emptyTopTracks, resetTopTracks} ){
    /* parse the track here */
    const [data, setData] = useState([])
    const [radioValue, setRadioValue] = useState('1')

    useEffect(() => {
        setData(tracks.map((track) => {
            return {
                artist: track[0].artist,
                title: track[0].title,
                uri: track[0].uri,
                albumUrl: track[0].albumUrl,
                id: track[0].id,
                color: track[0].color,
                acousticness: track[1]?.acousticness,
                danceability: track[1]?.danceability,
                energy: track[1]?.energy,
                valence: track[1]?.valence

            }
        }))

    }, [tracks])
    
    return(
        <>
        <Button id='resettracks-button' variant="outline-success" onClick={resetTopTracks}> Reset My Top Tracks </Button> {'    '}
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton id="tbg-radio-1" variant="outline-success" value={1} onChange={(e) => setRadioValue(e.currentTarget.value)}>
                Acousticness vs Danceability
            </ToggleButton>
            <ToggleButton id="tbg-radio-2" variant="outline-success" value={2} onChange={(e) => setRadioValue(e.currentTarget.value)}>
                Energy vs Valence
            </ToggleButton>
        </ToggleButtonGroup> {'   '}
        <Button id='emptytracks-button' variant="outline-success" onClick={emptyTopTracks}> Empty My Top Tracks </Button> {'    '}
        <Scatterplot data={data} width={700} height={700} chooseTrack={chooseTrack} setting={radioValue}/>
        </>
        
    )

}