import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './components/layout/SignIn/SignIn'
import Home from './components/pages/home/Home'
import Gallery from './components/pages/Gallery'
import AboutUs from './components/pages/AboutUs'
import Profile from './components/pages/Profile'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<SignIn />} />
          {/* <Route path="/logout" element={<SignIn />} />  */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
