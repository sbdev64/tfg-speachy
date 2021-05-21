import React, { useState } from 'react'
import FileBase from 'react-file-base64'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // https://www.npmjs.com/package/react-speech-recognition

import { createPost, updatePost } from '../../actions/posts'
import useStyles from './styles'

import { TextField, Button, Typography, Paper, IconButton } from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'

const Form = ({ currentId, setCurrentId, postData, setPostData, dispatch }) => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const [isListening, setIsListening] = useState(false)
  const user = JSON.parse(localStorage.getItem('profile'))
  const classes = useStyles()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!postData.message) {
      console.log('empty')
    } else {
      // if (isListening === true) {
      //   postData.message = transcript
      // }
      if (currentId === 0) {
        dispatch(createPost({ ...postData, name: user?.result?.name }))
      } else {
        dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
      } 
      clear()
    }
  }

  const clear = () => {
    setCurrentId(0)
    setPostData({ message: '', selectedFile: '' })
    stopListening()
  }

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In
        </Typography>
      </Paper>
    )
  }

  const handleListing = (e) => {
    if (isListening === false) {
      startListening()
    }
    
    if (isListening === true) {
      stopListening()
    }
  }

  const startListening = (e) => {
    setIsListening(true)
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US'
    })
  }
  
  const stopListening = (e) => {
    if (isListening) postData.message = transcript
    setIsListening(false)
    SpeechRecognition.stopListening()
    resetTranscript()
  }


  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6' className={classes.cardTitle} color='primary'>{currentId ? `Editing` : 'Create a card'}</Typography>
          
          {postData.message || isListening
          ? 
          <TextField  inputRef={input => input && input.focus()} name='message' variant='outlined' label='Message' fullWidth value={!isListening ? `${postData.message}` : `${transcript}`} onChange={(e) => setPostData({ ...postData, message: e.target.value })} 
          InputProps={{
          endAdornment: (
            <IconButton onClick={(e) => handleListing()}>
              { !isListening ? <MicIcon position='end' /> : <MicOffIcon position='end' color='error' /> }
            </IconButton>
          ),
          spellCheck: 'false' }}
          />
          :
          <TextField name='message' variant='outlined' label='Message' fullWidth value={!isListening ? `${postData.message}` : `${transcript}`} onChange={(e) => setPostData({ ...postData, message: e.target.value })} 
          InputProps={{
          endAdornment: (
            <IconButton onClick={(e) => handleListing()}>
              { !isListening ? <MicIcon position='end' /> : <MicOffIcon position='end' color='error' /> }
            </IconButton>
          ),}}
          />
          }

        <div className={classes.fileInput}>
          <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}/>
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>{currentId ? `Edit` : 'Submit'}</Button>
        <Button className={classes.buttonClear} variant='contained' color='secondary' size='small' onClick={() => clear()} fullWidth>{currentId ? `Cancel` : 'Clear'}</Button>
      </form>
    </Paper>
  )
}

export default Form