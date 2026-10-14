import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import RgbThermalSegmentation from './pages/RgbThermalSegmentation.jsx'
import SelfRAGConstitution from './pages/SelfRAGConstitution.jsx'
import ImageCaptioning from './pages/ImageCaptioning.jsx'
import GeospatialSegmentation from './pages/GeospatialSegmentation.jsx'
import MLFromScratch from './pages/MLFromScratch.jsx'
import StartupDashboard from './pages/StartupDashboard.jsx'
import InstructorEffectiveness from './pages/InstructorEffectiveness.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      {/* Lets keyboard users jump past the navbar */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-brass focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/rgb-thermal-segmentation" element={<RgbThermalSegmentation />} />
          <Route path="/projects/self-rag-constitution" element={<SelfRAGConstitution />} />
          <Route path="/projects/image-captioning" element={<ImageCaptioning />} />
          <Route path="/projects/geospatial-segmentation" element={<GeospatialSegmentation />} />
          <Route path="/projects/ml-from-scratch" element={<MLFromScratch />} />
          <Route path="/projects/startup-dashboard" element={<StartupDashboard />} />
          <Route
            path="/projects/instructor-effectiveness"
            element={<InstructorEffectiveness />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
