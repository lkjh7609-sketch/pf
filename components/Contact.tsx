import AnimatedSection from './AnimatedSection'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-3xl font-light mb-4">Get In Touch</h2>
          <p className="text-gray-500 font-light mb-8">
            프로젝트 문의나 협업 제안이 있으시면 연락주세요
          </p>
          <a
            href="mailto:javerdose@gmail.com"
            className="inline-block px-8 py-3 border border-black text-sm font-light
                       hover:bg-black hover:text-white transition-all duration-300"
          >
            javerdose@gmail.com
          </a>
        </AnimatedSection>
        <div className="mt-16 text-xs text-gray-400 font-light">
          © 2026 Ben Lee. All rights reserved.
        </div>
      </div>
    </section>
  )
}
