import React from 'react'
import Speech from 'speak-tts' // https://www.npmjs.com/package/speak-tts

import { deletePost } from '../../../actions/posts.js'
import useStyles from './styles'

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const Post = ({ post, setCurrentId, dispatch }) => {

  const speech = new Speech()
  const classes = useStyles()

  const speakButton = () => {
    speech.setLanguage('en-EN')
    speech.setPitch(1)

    speech.speak({
      text: post.message,
      queue: false,
    })
  }

  return (
    <>
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} component ='div' onClick={() => speakButton()}/>
      <div className={classes.overlay2}></div>
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">{post.message.charAt(0).toUpperCase()+post.message.slice(1)}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions} >
        <Button size='small' color='primary' onClick={() => {setCurrentId(post._id)}}>
          <EditIcon fontSize='default'/> 
        </Button>
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize='small'/>
        </Button>
      </CardActions>
    </Card>
    </>
  )
}

export default Post