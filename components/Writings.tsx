import { writingsData } from '@/data/writings'
import ImageGallery from './ImageGallery'
import AnimatedSection from './AnimatedSection'

export default function Writings() {
  return (
    <section id="writings" className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-light mb-2">Writing</h2>
          <p className="text-gray-500 font-light mb-16">생각과 경험을 공유합니다</p>
        </AnimatedSection>

        {writingsData.length > 0 ? (
          <ImageGallery items={writingsData} />
        ) : (
          <div className="text-center py-20 text-gray-400 font-light">
            <p className="text-4xl mb-4">✍️</p>
            <p>글이 준비 중입니다</p>
          </div>
        )}
      </div>
    </section>
  )
}
