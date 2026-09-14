import { projectsData } from '@/data/projects'
import ImageGallery from './ImageGallery'
import AnimatedSection from './AnimatedSection'

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-light mb-2">Projects</h2>
          <p className="text-gray-500 font-light mb-16">내가 작업한 프로젝트들</p>
        </AnimatedSection>

        {projectsData.length > 0 ? (
          <ImageGallery items={projectsData} />
        ) : (
          <div className="text-center py-20 text-gray-400 font-light">
            <p className="text-4xl mb-4">🚀</p>
            <p>프로젝트가 준비 중입니다</p>
          </div>
        )}
      </div>
    </section>
  )
}
