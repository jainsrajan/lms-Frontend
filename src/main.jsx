//Component import........
import React from 'react'
import App from './App.jsx'

//CSS import.........
import './index.css'

//Libraries import............
import { Toaster } from 'react-hot-toast'
import store from './Redux/Slices/store.js'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <BrowserRouter>
    <App />
    <Toaster/>
  </BrowserRouter>,
  </Provider>
 
)
