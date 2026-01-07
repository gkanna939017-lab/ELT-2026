import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import BrowseTalent from './pages/BrowseTalent.jsx'
import TrainingHub from './pages/TrainingHub.jsx'
import WorkerRegistration from './pages/WorkerRegistration.jsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f4f8ff] to-white text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/browse" element={<BrowseTalent />} />
          <Route path="/training" element={<TrainingHub />} />
          <Route path="/register" element={<WorkerRegistration />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
