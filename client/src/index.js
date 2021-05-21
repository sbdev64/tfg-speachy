import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import reducers from './reducers'
import App from './App'
import './index.css'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#087add',
    },
    secondary: {
      main: '#FF5A78', 
    } 
  },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
        <App />
    </Provider>
  </ThemeProvider>,
   document.getElementById('root')
)