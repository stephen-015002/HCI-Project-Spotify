import React from 'react'
import { Container } from 'react-bootstrap'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=5b211a2d15e54da686a08946810f4947&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read&show_dialog=true"

export default function Login() {
  return <div style={{backgroundColor: '#141414', minHeight: "100vh"}}>
  <Container className="d-flex justify-content-center align-items-end" style={{minHeight: "20vh"}}>
      <h1 style={{color: "#2F8886"}}> Track Analytics</h1>
  </Container>
  <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "10vh"}}>
      <h5 style={{color: '#D1D4C9'}}> Supported with Spotify Web API</h5>
  </Container>
    <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "50vh"}}>
    <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With spotify
    </a>
  </Container>
  <Container className="d-flex justify-content-center align-items-end" style={{minHeight: "10vh"}}>
      <h5 style={{color: '#D1D4C9'}}> a HCI Project by Stephen Iskandar</h5>
  </Container>
  </div>
}
