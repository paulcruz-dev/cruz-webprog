import { StrictMode } from 'react'
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
