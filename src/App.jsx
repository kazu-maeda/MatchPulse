import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { InstallBanner } from './components/InstallBanner'
import { Home } from './pages/Home'
import { Matches } from './pages/Matches'
import { Favorites } from './pages/Favorites'
import { Standings } from './pages/Standings'
import './styles/globals.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/standings" element={<Standings />} />
          </Routes>
        </main>
        <InstallBanner />
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
