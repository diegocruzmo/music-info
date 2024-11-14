import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signOut } from '../../firebase'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import { useLocation } from 'wouter'
import toast from 'react-hot-toast'

const Header = () => {
  const [user, loading] = useAuthState(auth)
  const [, setLocation] = useLocation()

  useEffect(() => {
    if (!user) {
      setLocation('/')
    } else {
      setLocation('/dashboard')
      //console.log(user)
    }
  }, [user, loading, setLocation])

  const handleClick = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout successful!')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Music App
          </Typography>
          {user && (
            <Button onClick={handleClick} color='inherit'>
              logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
