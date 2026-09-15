'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { useLanguage } from '@/contexts/LanguageContext'

interface SkillCategory {
  title: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'SAP',
    skills: ['ABAP', 'SAP FI', 'SAP CO', 'SAP BTP'],
  },
  {
    title: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'SQL'],
  },
]

export default function Skills() {
  const { messages } = useLanguage()

  return (
    <section id="skills" className="py-24 px-4 md:px-6 bg-beige-light">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-light mb-2 text-black">
            {messages.skills?.title || 'Skills'}
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-light mb-12">
            {messages.skills?.subtitle || 'Technical Expertise & Proficiency'}
          </p>
        </AnimatedSection>

        <div className="space-y-10">
          {skillCategories.map((category, catIdx) => (
            <AnimatedSection key={category.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.15 }}
              >
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + idx * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="px-5 py-3 bg-white border border-gray-200 rounded-lg text-sm font-light text-black
                                 hover:border-beige-dark hover:shadow-sm transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
