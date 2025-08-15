'use client'

import React, { useState, useEffect, ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const messages = [
  "You’re the sunshine in my every day 🌞",
  "I’d choose you, in every lifetime 💫",
  "Your smile is my favorite melody 🎶",
  "With you, every day is a celebration 🎉",
  "You light up my world like nobody else ✨",
  "You’re my greatest adventure 🌍",
  "Falling for you more and more every day 💜",
  "To the most beautiful soul — Happy Birthday, love 💐",
]

export default function Home() {
  const [index, setIndex] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [bgm, setBgm] = useState<HTMLAudioElement | null>(null)
  const [petals, setPetals] = useState<ReactElement[]>([])
  const [secretShown, setSecretShown] = useState(false)
  const [secretClicks, setSecretClicks] = useState(0)
  const [pressCount, setPressCount] = useState(0)
  const [romanticMode, setRomanticMode] = useState(false)

  const handleClick = () => {
    const newCount = pressCount + 1
    setPressCount(newCount)

    if (newCount >= 10) {
      setRomanticMode(true)
    }

    setIndex((prev) => (prev + 1) % messages.length)
    setShowPopup(true)

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const handleSecretTap = () => {
    setSecretClicks((prev) => {
      const updated = prev + 1
      if (updated >= 3) setSecretShown(true)
      return updated
    })
  }

  useEffect(() => {
    const audio = new Audio('/audio/happy.mp3')
    audio.loop = true
    audio.volume = 0.5
    setBgm(audio)

    const generatePetals = (count: number) => {
      return Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 left-0 w-6 h-6 text-purple-400 text-2xl select-none pointer-events-none"
          initial={{ x: Math.random() * window.innerWidth, y: -50, opacity: 0 }}
          animate={{
            y: window.innerHeight + 50,
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
    }

    setPetals(generatePetals(20))
  }, [])

  const startMusic = () => {
    if (bgm) bgm.play()
    handleClick()
  }

  // Generate stars for romantic mode
  const stars = romanticMode
    ? Array.from({ length: 50 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))
    : null

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden transition-colors duration-1000 ${
        romanticMode
          ? 'bg-gradient-to-b from-purple-900 via-purple-800 to-black'
          : 'bg-gradient-to-br from-purple-100 to-purple-200'
      }`}
    >
      {petals}
      {stars}

      {/* Hint for secret message */}
      <p className="absolute bottom-2 left-2 text-xs text-purple-500">
        (🌺 Sometimes the smallest things hide the sweetest secrets... Try tapping more than once.)
      </p>

      {/* Hidden flower to tap */}
      <div
        onClick={handleSecretTap}
        className="absolute top-2 right-2 text-2xl cursor-pointer opacity-30 hover:opacity-100 transition animate-pulse"
      >
        🌺
      </div>

      {secretShown && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 text-white p-4 rounded-xl shadow-lg z-50 relative overflow-hidden"
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 10px #fff',
                '0 0 20px #ff99ff',
                '0 0 10px #fff',
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="font-bold"
          >
            💜 You found the secret message! I love you more than words can say.
          </motion.span>

          {/* Floating hearts */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-200"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0,
              }}
              animate={{
                y: -80,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ❤️
            </motion.div>
          ))}
        </motion.div>
      )}

      <h1
        className={`text-4xl md:text-6xl font-bold mb-6 ${
          romanticMode ? 'text-purple-300' : 'text-purple-700'
        }`}
      >
        🎂 Happy Birthday, My Love!
      </h1>

      <motion.button
        onClick={startMusic}
        whileHover={{ scale: 1.1 }}
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 0px #a855f7",
            "0 0 15px #a855f7",
            "0 0 0px #a855f7"
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
