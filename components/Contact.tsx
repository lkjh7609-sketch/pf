'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Contact() {
  const { messages } = useLanguage()
  const [showForm, setShowForm] = useState(false)
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
        setTimeout(() => {
          setStatus('idle')
          setShowForm(false)
        }, 3000)
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
    <section id="contact" className="py-20 md:py-24 px-6 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <AnimatedSection>
          {messages.contact.title && (
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-light mb-4 md:mb-4 text-black">{messages.contact.title}</h2>
          )}
          <div className="w-16 md:w-16 h-px bg-gray-300 mx-auto mb-6 md:mb-6"></div>
          <p className="text-base md:text-sm text-gray-500 font-light mb-8 md:mb-8 px-4">
            프로젝트 문의나 협업 제안이 있으시면 연락주세요.
          </p>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="inline-block px-8 md:px-8 py-3.5 md:py-3 border border-black text-base md:text-sm font-light
                         text-black hover:bg-black
                         hover:text-white transition-all duration-300 rounded"
            >
              javerdose@yahoo.com
            </button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-beige-light p-6 md:p-6 lg:p-8 rounded-lg text-left">
                  <div className="flex justify-between items-center mb-6 md:mb-6">
                    <h3 className="text-xl md:text-lg lg:text-xl font-semibold">Contact Form</h3>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-gray-500 hover:text-black text-2xl md:text-2xl p-2"
                      aria-label="Close form"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm md:text-sm font-medium mb-2 md:mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 md:px-4 py-3 md:py-2.5 border border-gray-300 rounded focus:outline-none focus:border-black text-base md:text-sm"
                        required
                        disabled={status === 'sending'}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm md:text-sm font-medium mb-2 md:mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 md:px-4 py-3 md:py-2.5 border border-gray-300 rounded focus:outline-none focus:border-black text-base md:text-sm"
                        required
                        disabled={status === 'sending'}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm md:text-sm font-medium mb-2 md:mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 md:px-4 py-3 md:py-2.5 border border-gray-300 rounded focus:outline-none focus:border-black resize-none text-base md:text-sm"
                        required
                        disabled={status === 'sending'}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full px-8 md:px-8 py-3.5 md:py-3 bg-black text-white text-base md:text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded"
                    >
                      {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>

                    {status === 'success' && (
                      <div className="text-green-600 text-sm md:text-sm text-center">
                        ✓ Message sent successfully!
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="text-red-600 text-sm md:text-sm text-center">
                        ✗ Failed to send message. Please try again.
                      </div>
                    )}
                  </form>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </AnimatedSection>
        <div className="mt-16 md:mt-16 text-xs text-gray-400 font-light px-4">
          {messages.contact.copyright}
        </div>
      </div>
    </section>
  )
}
