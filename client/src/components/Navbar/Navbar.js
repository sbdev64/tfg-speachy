import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import logo from '../../images/logo.png'
import useStyles from './styles'

import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()

  const logout = () => {
    dispatch({ type: 'LOGOUT'})

    history.push('/')

    setUser(null)
  }

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
      // eslint-disable-next-line
  }, [location])

  
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer} component={Link} to='/'>
        <Link to='/'>
          <img className={classes.image} src={logo}  alt='speachy' height='60'/>  
        </Link>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Typography className={classes.userName} color='primary' variant='h6'>{user.result.name}</Typography>
            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
          </div>
        ) : (
            <Button component={Link} to='/auth' variant='contained' className={classes.signin} color='primary'>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
