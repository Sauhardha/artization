import { Box, Container } from '@mui/material'
import Header from '../layout/Navbar/Header'

export default function Profile() {
  return (
    <Container maxWidth={false}>
      <Header />

      <Container maxWidth="xl">
        <Box>Profile</Box>
      </Container>
    </Container>
  )
}