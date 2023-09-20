import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import logo from './logo.svg'

export default function Header() {
  return (
    <AppBar position="static" style={{ background: '#181E24' }} elevation={0}>
      <Toolbar
        style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Box sx={{ display: 'flex', gap: '30px', fontFamily: 'Khmer MN' }}>
          <Link to="/gallery">GALLERY</Link>
          <Link to="/">HOME</Link>
          <Link to="/about-us">ABOUT US</Link>
        </Box>
        <Box
          sx={{
            border: '1px solid #D9D9D9',
            padding: '5px 6px',
            borderRadius: '11px',
          }}
        >
          <Typography sx={{ padding: '4px' }}>
            <Link to="/profile">welcome, Curator</Link>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
