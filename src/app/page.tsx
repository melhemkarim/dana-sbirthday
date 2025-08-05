'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const messages = [
  "I LOVE YOU SATTULTEEEE 💖",
  "You’re the sunshine in my every day 🌞",
  "I’d choose you, in every lifetime 💫",
  "Your smile is my favorite melody 🎶",
  "With you, every day is a celebration 🎉",
  "You light up my world like nobody else ✨",
  "You’re my greatest adventure 🌍",
  "Falling for you more and more every day 💖",
  "To the most beautiful soul — Happy Birthday, love 💐",
]

export default function Home() {
  const [index, setIndex] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [bgm, setBgm] = useState<HTMLAudioElement | null>(null)
  const [petals, setPetals] = useState<React.ReactElement[]>([])

  // Generate petals only on client after mount to avoid hydration mismatch
  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const newPetals = Array.from({ length: 40 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute top-0 left-0 w-6 h-6 text-purple-400 text-2xl select-none pointer-events-none"
        initial={{ x: Math.random() * width, y: -50, opacity: 0 }}
        animate={{
          y: height + 50,
          opacity: [0, 1, 0.8, 0],
          rotate: 360,
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
        style={{ left: `${Math.random() * 100}%` }}
      >
        🌸
      </motion.div>
    ))
    setPetals(newPetals)
  }, [])

  useEffect(() => {
    const audio = new Audio('/audio/happy.mp3')
    audio.loop = true
    audio.volume = 0.5
    setBgm(audio)
  }, [])

  const handleClick = () => {
    setIndex((prev) => (prev + 1) % messages.length)
    setShowPopup(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const startMusic = () => {
    if (bgm) bgm.play()
    handleClick()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 text-center px-4 relative overflow-hidden">
      {petals}

      <h1 className="text-4xl md:text-6xl font-bold text-purple-700 mb-6">
        🎂 Happy Birthday, My Love!
      </h1>

      <motion.button
        onClick={startMusic}
        whileHover={{ scale: 1.1 }}
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 0px #ec4899",
            "0 0 15px #ec4899",
            "0 0 0px #ec4899"
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition"
      >
        Press Me 💌
      </motion.button>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed top-20 bg-white text-purple-600 border border-purple-300 rounded-xl shadow-lg p-6 max-w-sm mx-auto mt-6 z-50"
          >
            <p className="text-lg font-medium">{messages[index]}</p>
            <div className="text-3xl mt-2 animate-pulse">🌸</div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src="/images/flowers.svg"
        alt="Flowers"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-0 w-full max-h-60 object-contain"
      />
    </div>
  )
}