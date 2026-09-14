'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="py-12 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl text-gray-300 mb-6">
            프로젝트 문의나 협업 제안이 있으시면 연락주세요
          </p>
          
          <motion.a
            href="mailto:javerdose@gmail.com"
            className="inline-block text-xl text-beige hover:text-beige-dark transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            javerdose@yahoo.com
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-gray-800 text-sm text-gray-500"
        >
          <p>© 2026 Ben Lee. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  )
}
