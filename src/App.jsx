import { useState } from 'react'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Header/>
      <Dashboard/>
      <Footer/>
    </div>
  )
}

export default App