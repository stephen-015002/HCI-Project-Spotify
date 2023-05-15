import React from 'react'
import {Col, Card} from 'react-bootstrap'

export default function topTracks( {track, chooseTrack} ) {
    function handlePlay() {
        chooseTrack(track)
    }
  return (
    <Col>
    <Card style={{cursor: "pointer"}} bg='dark' text='light' onClick={handlePlay}>
        <Card.Img variant="top" src={track[0].albumUrl} style={{height: '80px', width: '80px'}} />
        <Card.Body>
            <Card.Title>{track[0].title}</Card.Title>
            <Card.Text>{track[0].artist}</Card.Text>
        </Card.Body>
    </Card>
    </Col>
  )
}