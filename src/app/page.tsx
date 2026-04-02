import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import MouseParticles from '@/components/ui/MouseParticles'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <MouseParticles />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
