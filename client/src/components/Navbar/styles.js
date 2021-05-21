import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginRight: '10px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '800px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '600px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.7rem',
    fontWeight: 500,
    flexBasis: 'auto',
    marginRight: '40px'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '30px',
  },
  purple: {
    opacity: 0,
    marginRight: '10px'
  },
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse'
    },
    userName: {
      display: 'none'
    },
    purple: {
      display: 'none'
    },
    brandContainer: {
      marginLeft: '-8px'
    },
    profile: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '400px'
    }
  }
}))