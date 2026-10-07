import { useAuthContext } from './context/AuthContext'
import Routes from './pages/Routes'
import './index.css'
import ScreenLoader from './components/ScreenLoader/screenloader'

function App() {

  const { isAppLoading } = useAuthContext()

  return (
    <>
      {
        !isAppLoading ?
          <Routes />
          :
          <ScreenLoader />
      }
    </>
  )
}

export default App
