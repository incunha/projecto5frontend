import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Renderiza o aplicativo dentro do elemento com id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<BrowserRouter>
    <App />
</BrowserRouter>
  </React.StrictMode>,
)
