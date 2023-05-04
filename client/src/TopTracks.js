import React from 'react'

export default function topTracks( {track} ) {
    console.log(track)
  return (
    
    <div className='d-flex m-2 align-items-center' style={{cursor: "pointer"}}>
        <img src={track[0].albumUrl} style={{height: '64px', width: '64px'}} />
        <div className='ml-3'>
            <div>{track[0].title}</div>
            <div className='text-muted'>{track[0].artist}</div>
            <div className='text-muted'>{track[0].id}</div>
            {track[1] !== undefined && (
                <div className='text-muted'>{track[1].acousticness}</div>
            )}
            {track[1] !== undefined && (
                <div className='text-muted'>{track[1].danceability}</div>
            )}
            {track[1] !== undefined && (
                <div className='text-muted'>{track[1].energy}</div>
            )}
            {track[1] !== undefined && (
                <div className='text-muted'>{track[1].valence}</div>
            )}

        </div>
    </div>
  )
}