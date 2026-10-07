import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd'
import AuthContext from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: "#1d3557" }, components: { Button: { controlOutlineWidth: 0 } } }}>
        <AuthContext>
          <App />
        </AuthContext>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)
