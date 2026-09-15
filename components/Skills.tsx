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
    <section id="skills" className="py-20 md:py-24 px-6 md:px-6 bg-beige-light">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-light mb-3 text-black">
            {messages.skills?.title || 'Skills'}
          </h2>
          <p className="text-base md:text-base text-gray-500 font-light mb-12">
            {messages.skills?.subtitle || 'Technical Expertise & Proficiency'}
          </p>
        </AnimatedSection>

        <div className="space-y-12">
          {skillCategories.map((category, catIdx) => (
            <AnimatedSection key={category.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.15 }}
              >
                <h3 className="text-sm md:text-sm font-medium text-gray-400 uppercase tracking-wider mb-5">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2.5 md:gap-3">
                  {category.skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + idx * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="px-3.5 py-2 md:px-5 md:py-3 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm md:text-sm font-light text-black
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
