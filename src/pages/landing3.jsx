'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedBackgroundWithCards() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const can = canvasRef.current
    if (!can) return

    const ctx = can.getContext('2d')
    if (!ctx) return

    can.width = window.innerWidth
    can.height = window.innerHeight
    can.style.background = "black"

    let p = []

    function Clear() {
      if (!ctx) return
      ctx.fillStyle = "rgba(0,0,0,0.07)"
      ctx.fillRect(0, 0, can.width, can.height)
    }

    function particle( x, y, speed, c) {
      this.x = x
      this.y = y
      this.speed = speed
      this.upd = function() {
        if (!ctx) return
        ctx.strokeStyle = c
        ctx.lineWidth = 1
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        this.x += this.speed.x
        this.y += this.speed.y
        ctx.lineTo(this.x, this.y)
        ctx.stroke()
        this.ang = Math.atan2(this.speed.y, this.speed.x)
        this.mag = Math.sqrt(this.speed.x*2 + this.speed.y*2)
        var op = [this.ang + Math.PI/4, this.ang - Math.PI/4]
        var ch = Math.floor(Math.random() * op.length)
        if (Math.random() < 0.05) {
          this.speed.x = Math.cos(op[ch]) * this.mag
          this.speed.y = Math.sin(op[ch]) * this.mag
        }
      }
    }

    const speed = 5
    const period = 1000

    function pulse() {
      setTimeout(pulse, period)
      var h = Math.random() * (210 - 150) + 150
      for (var i = 0; i < 56; i++) {
        p.push(new (particle)(can.width/2, can.height/2,
        {
          x: Math.cos(i/8*2*Math.PI) * speed,
          y: Math.sin(i/8*2*Math.PI) * speed
        }, "white"))
      }
    }

    function gameMove() {
      requestAnimationFrame(gameMove)
      Clear()
      for (var i = 0; i < p.length; i++) {
        p[i].upd()
        if (p[i].x < 0 || p[i].x > can.width || p[i].y < 0 || p[i].y > can.height) {
          p.splice(i, 1)
        }
      }
    }

    pulse()
    gameMove()

    // Cleanup function
    return () => {
      p = []
    }
  }, [])

  const cardData = [
    { title: "Card 1", description: "Description for Card 1", content: "Content for Card 1" },
    { title: "Card 2", description: "Description for Card 2", content: "Content for Card 2" },
    { title: "Card 3", description: "Description for Card 3", content: "Content for Card 3" },
    { title: "Card 4", description: "Description for Card 4", content: "Content for Card 4" },
    { title: "Card 5", description: "Description for Card 5", content: "Content for Card 5" },
  ]

  return (
    <div className="relative w-full min-h-screen">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 flex items-center justify-center w-full min-h-screen p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cardData.map((card, index) => (
            <div key={index} className="w-full max-w-xs bg-white bg-opacity-10 backdrop-blur-md rounded-lg overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold text-white mb-2">{card.title}</h2>
                <p className="text-gray-300 text-sm mb-4">{card.description}</p>
                <p className="text-gray-100">{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


