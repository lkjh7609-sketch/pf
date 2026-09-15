'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { useLanguage } from '@/contexts/LanguageContext'

interface Skill {
  name: string
  level: number
  category: string
}

const skills: Skill[] = [
  // SAP & ABAP
  { name: 'ABAP', level: 90, category: 'SAP' },
  { name: 'SAP FI', level: 85, category: 'SAP' },
  { name: 'SAP CO', level: 80, category: 'SAP' },
  { name: 'SAP BTP', level: 75, category: 'SAP' },

  // Backend
  { name: 'Java', level: 85, category: 'Backend' },
  { name: 'Spring Boot', level: 80, category: 'Backend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Next.js', level: 80, category: 'Backend' },

  // Database
  { name: 'PostgreSQL', level: 85, category: 'Database' },
  { name: 'MySQL', level: 80, category: 'Database' },
  { name: 'SQL', level: 90, category: 'Database' },

  // Other
  { name: 'TypeScript', level: 85, category: 'Language' },
  { name: 'Python', level: 75, category: 'Language' },
  { name: 'Git', level: 85, category: 'DevOps' },
]

const categories = [
  { name: 'SAP', color: 'bg-blue-500' },
  { name: 'Backend', color: 'bg-green-500' },
  { name: 'Database', color: 'bg-purple-500' },
  { name: 'Language', color: 'bg-orange-500' },
  { name: 'DevOps', color: 'bg-red-500' },
]

export default function Skills() {
  const { messages } = useLanguage()

  return (
    <section id="skills" className="min-h-screen py-24 px-6 bg-beige-light">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-light mb-2 text-black">
            {messages.skills?.title || 'Skills'}
          </h2>
          <p className="text-gray-500 font-light mb-16">
            {messages.skills?.subtitle || 'Technical Expertise & Proficiency'}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => {
            const categorySkills = skills.filter(s => s.category === category.name)

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>

                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-2 rounded-full ${category.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Tech Stack Badges */}
        <AnimatedSection>
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-6">Tech Stack</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['ABAP', 'SAP', 'Java', 'Spring', 'Node.js', 'Next.js', 'TypeScript',
                'PostgreSQL', 'MySQL', 'Git', 'Docker', 'AWS'].map((tech, idx) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:border-beige-dark transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
