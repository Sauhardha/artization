import React from 'react'
import Header from '../../layout/Navbar/Header'
import { Box, Container } from '@mui/material'

export default function Home() {
  return (
    <>
      <Container maxWidth={false}>
        <Header />

        <Container maxWidth="xl">
          <Box>Home</Box>
        </Container>
      </Container>
    </>
  )
}
