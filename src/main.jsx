import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MARCA } from './config/marca'

// El título de la pestaña toma el nombre desde la configuración de la marca.
document.title = MARCA.nombre

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
