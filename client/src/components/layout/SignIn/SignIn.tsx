import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import artizationLogo from './artizationLogo.svg'
import LoginPage from './loginPage.svg'

export default function SignIn() {
  return (
    <Container maxWidth={false}>
      <Container maxWidth='xl'>
        <Toolbar style={{ background: '#fff', marginTop: '86px' }}>
          <img
            src={artizationLogo}
            alt="Artization Logo"
            style={{ maxHeight: '259px', width: '100%' }}
          />
        </Toolbar>
        <Toolbar style={{ background: '#fff', marginTop: '26px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <img
              src={LoginPage}
              alt="Login Page"
              style={{
                maxWidth: '100%',
                maxHeight: '330px',
                width: 'auto',
                height: 'auto',
                flex: '1',
              }}
            />
            <Box
              sx={{
                background: '#DEDEDE',
                margin: '20px 0',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1',
              }}
            >
              <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  sx={{ backgroundColor: 'white' }}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  sx={{ backgroundColor: 'white' }}
                  autoComplete="current-password"
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                      type="submit"
                      // fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '10px',
                    }}
                  >
                    <Typography style={{ color: 'black' }}>
                      Don't have an account?
                    </Typography>
                    <Link href="#" variant="body2">
                      {'Sign Up'}
                    </Link>
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </Toolbar>
      </Container>
    </Container>
  )
}
