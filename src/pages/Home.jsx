import Hero from '../components/Hero.jsx'
import EngineeringIdentity from '../components/EngineeringIdentity.jsx'
import About from '../components/About.jsx'
import Skills from '../components/Skills.jsx'
import Projects from '../components/Projects.jsx'
import CodingProfiles from '../components/CodingProfiles.jsx'
import Education from '../components/Education.jsx'
import Certifications from '../components/Certifications.jsx'
import CurrentlyLearning from '../components/CurrentlyLearning.jsx'
import Resume from '../components/Resume.jsx'
import Contact from '../components/Contact.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <EngineeringIdentity />
      <About />
      <Skills />
      <Projects />
      <CodingProfiles />
      <Education />
      <Certifications />
      <CurrentlyLearning />
      <Resume />
      <Contact />
    </>
  )
}
