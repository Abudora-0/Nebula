import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #e0f2fe 0%, #f0f9ff 40%, #ffffff 100%)' }}>
      <Navbar />
      <main className="flex-1">
        <Manager />
      </main>
      <Footer />
    </div>
  )
}

export default App
