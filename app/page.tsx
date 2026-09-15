import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Writings from '@/components/Writings'
import Contact from '@/components/Contact'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Skills />
      <Projects />
      <Writings />
      <Contact />
      <ScrollToTop />
    </main>
  )
}
