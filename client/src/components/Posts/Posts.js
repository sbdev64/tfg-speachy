import React from 'react'

import Post from './Post/Post.js'
import useStyles from './styles'

import { Grid } from '@material-ui/core'

const Posts = ({ setCurrentId, currentId, getPosts, posts, dispatch }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const classes = useStyles()

  return (
    <>
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
      {posts.map(
        post =>
          (user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Grid key={post._id} item xs={6} sm={6} md={6} lg={4}>
              <Post
                post={post}
                currentId={currentId}
                setCurrentId={setCurrentId}
                getPosts={getPosts}
                posts={posts}
                dispatch={dispatch}
              />
            </Grid>
          )
      )}
      </Grid>
    </>
  )
}

export default Posts