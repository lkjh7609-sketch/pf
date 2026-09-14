import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
// import Projects from '@/components/Projects'
import Writings from '@/components/Writings'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Writings />
      {/* <Projects /> */}
      <Contact />
    </main>
  )
}
