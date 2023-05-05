import { useState, useEffect } from 'react'
import { Scatterplot } from './Scatterplot'


export default function ScatterplotDemo( {tracks, chooseTrack} ){
    /* parse the track here */
    const [data, setData] = useState([])

    useEffect(() => {
        setData(tracks.map((track) => {
            return {
                artist: track[0].artist,
                title: track[0].title,
                uri: track[0].uri,
                albumUrl: track[0].albumUrl,
                id: track[0].id,
                acousticness: track[1]?.acousticness,
                danceability: track[1]?.danceability,
                energy: track[1]?.energy,
                valence: track[1]?.valence

            }
        }))

    }, [tracks])

    console.log(data)
    return(
        <Scatterplot data={data} width={700} height={700} chooseTrack={chooseTrack} />
    )

}