'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Contact() {
  const { messages } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 text-black">Contact</h2>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <p className="text-gray-500 font-light">
              {messages.contact.subtitle}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                  required
                  disabled={status === 'sending'}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                  required
                  disabled={status === 'sending'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black resize-none"
                  required
                  disabled={status === 'sending'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="text-green-600 text-sm text-center">
                  ✓ Message sent successfully!
                </div>
              )}

              {status === 'error' && (
                <div className="text-red-600 text-sm text-center">
                  ✗ Failed to send message. Please try again.
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-gray-600 leading-relaxed">
                프로젝트 문의나 협업 제안이 있으시면 언제든지 연락주세요.
                24시간 내에 답변드리겠습니다.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📧</div>
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:javerdose@gmail.com"
                    className="text-gray-600 hover:text-black"
                  >
                    javerdose@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">💼</div>
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-gray-600">Connect on LinkedIn</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">🔗</div>
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-gray-600">Check out my repositories</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center text-xs text-gray-400 font-light">
          {messages.contact.copyright}
        </div>
      </div>
    </section>
  )
}
