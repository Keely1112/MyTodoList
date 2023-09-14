import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header/header'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Header/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


