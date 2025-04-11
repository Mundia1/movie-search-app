import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import MovieDetailsPage from './pages/MovieDetailsPage';
import logo from './assets/logo.png';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <header className="app-header">
            <div className="flex items-center space-x-4">
              <img src={logo} alt="Movie Search Logo" className="app-logo" />
              <h1 className="app-title">Movie Search</h1>
            </div>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>© 2025 Movie Search App. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;