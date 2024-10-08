import './App.scss';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/Home'
import Header from './features/Header'
import Footer from './features/Footer'
import SignIn from './features/SignIn';
import MovieDetails from './features/MovieDetails'

function App() {
  const [navbarActive, setNavbarActive] = useState(false);

  const handleMenuBar = () => {
    setNavbarActive(!navbarActive)
  }

  return (
    <div className='app' >
      <Router>
        <Header handleMenuBar={handleMenuBar} navbarActive={navbarActive}/>
        <Routes>
          <Route path='/' element={<Home navbarActive={navbarActive}/>}/>
          <Route path='/movie/:imdbID' element={<MovieDetails/>}/>
          <Route path='signin' element={<SignIn handleMenuBar={handleMenuBar} navbarActive={navbarActive}/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
