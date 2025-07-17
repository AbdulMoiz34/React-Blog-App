import { Toaster } from 'react-hot-toast'
import './App.css'
import Router from './AppRouter/Router'

function App() {

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Router />
    </>
  )
}

export default App
