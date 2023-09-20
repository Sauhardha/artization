import { Box, Container } from '@mui/material'
import Header from '../layout/Navbar/Header'

export default function Gallery() {
  return (
    <Container maxWidth={false}>
      <Header />

      <Container maxWidth="xl">
        <Box>Gallery</Box>
      </Container>
    </Container>
  )
}
