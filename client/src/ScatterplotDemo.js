import { useState, useEffect } from 'react'
import Scatterplot from './Scatterplot'
import { ButtonGroup, Button, OverlayTrigger, Popover } from 'react-bootstrap'


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
        <ButtonGroup type="buttons">
        <OverlayTrigger
          trigger="hover"
          variant="secondary"
          placement="bottom"
          key= "bottom"
          overlay={
            <Popover id="popover-positioned-bottom">
              <Popover.Header as="h3"> What does this mean ? </Popover.Header>
              <Popover.Body>
                <strong>Acousticness</strong> refers to a measure from 0.0 to 1.0 of whether the track is acoustic. <br/> <strong>Danceability</strong> refers to a measure from 0.0 to 1.0 of how suitable the track is for dancing based on a combination of musical elements.
              </Popover.Body>
            </Popover>
          }
        >
            <Button id="b-1" variant="outline-success" value={1} onClick={(e) => setRadioValue(e.currentTarget.value)}>
                Acousticness vs Danceability
            </Button>
        </OverlayTrigger>
        <OverlayTrigger
          trigger="hover"
          variant="secondary"
          placement="bottom"
          key= "bottom"
          overlay={
            <Popover id="popover-positioned-bottom">
              <Popover.Header as="h3"> What does this mean ? </Popover.Header>
              <Popover.Body>
                <strong>Energy</strong> refers to a measure from 0.0 to 1.0 of the intensity and energy of the track. Typically, energetic tracks feel fast, loud and noisy. <br/> <strong>Valence</strong> refers to a measure from 0.0 to 1.0 of the musical positiveness conveyed by a track. Typically, tracks with high valence sound more positive, while tracks with low valence sound more negative.
              </Popover.Body>
            </Popover>
          }
        >
            <Button id="b-2" variant="outline-success" value={2} onClick={(e) => setRadioValue(e.currentTarget.value)}>
                Energy vs Valence
            </Button>
        </OverlayTrigger>
        </ButtonGroup> {'   '}
        <Button id='emptytracks-button' variant="outline-success" onClick={emptyTopTracks}> Empty My Top Tracks </Button> {'    '}
        <Scatterplot data={data} width={700} height={700} chooseTrack={chooseTrack} setting={radioValue}/>
        </>
        
    )

}