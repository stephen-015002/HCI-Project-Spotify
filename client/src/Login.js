import React from 'react'
import { Container } from 'react-bootstrap'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=5b211a2d15e54da686a08946810f4947&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <div>Login</div>
  )
}
