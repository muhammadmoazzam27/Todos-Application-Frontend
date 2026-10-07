import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: "#1d3557" }, components: { Button: { controlOutlineWidth: 0 } } }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)
