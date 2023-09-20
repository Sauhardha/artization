import { Box, Container } from '@mui/material'
import Header from '../layout/Navbar/Header'

export default function AboutUs() {
  return (
    <Container maxWidth={false}>
      <Header />

      <Container maxWidth="xl">
        <Box>About Us</Box>
      </Container>
    </Container>
  )
}