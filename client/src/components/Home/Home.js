import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import Posts from '../Posts/Posts.js'
import Form from '../Form/Form.js'
import { getPosts } from '../../actions/posts.js'
import useStyles from '../Navbar/styles'

import { Container, Grow, Grid } from '@material-ui/core'

const Home = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [currentId, setCurrentId] = useState(0)
  const [postData, setPostData] = useState({
    message: "",
    selectedFile: "",
  })
 
  const posts = useSelector((state) => state.posts) 

  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

  useEffect(() => {   
    dispatch(getPosts())
  }, [dispatch, setCurrentId])

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  return (
    <Grow in>
    <Container>
      <Grid container className={classes.mainContainer} justify='space-evenly' alignItems='stretch' spacing={3}>
        <Grid item xs={12} sm={7}>
        <Posts
              currentId={currentId}
              setCurrentId={setCurrentId}
              getPosts={getPosts}
              posts={posts}
              dispatch={dispatch}
            />
        </Grid>
        <Grid item xs={12} sm={4}>
        <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              postData={postData}
              setPostData={setPostData}
              dispatch={dispatch}
            />
        </Grid>
      </Grid>
    </Container>
    </Grow>
  )
}

export default Home
