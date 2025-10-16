"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  MoreHorizontal
} from "lucide-react"

interface AudioPlayerProps {
  title?: string
  className?: string
}

export function AudioPlayer({ title = "景點導覽", className = "" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  
  const progressRef = useRef<HTMLDivElement>(null)

  // 模擬音頻數據
  useEffect(() => {
    // 模擬音頻時長（2分58秒）
    setDuration(178)
  }, [])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    console.log(`[v0] Audio ${isPlaying ? 'paused' : 'playing'} for: ${title}`)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return
    
    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const newTime = (clickX / width) * duration
    
    setCurrentTime(newTime)
    console.log(`[v0] Audio seeked to: ${Math.floor(newTime)}s`)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    console.log(`[v0] Volume changed to: ${newVolume}%`)
  }

  const toggleMute = () => {
    if (isMuted) {
      setVolume(50)
      setIsMuted(false)
    } else {
      setVolume(0)
      setIsMuted(true)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`bg-gray-100 rounded-full px-4 py-3 flex items-center gap-3 ${className}`}>
      {/* 播放/暫停按鈕 */}
      <button
        onClick={togglePlayPause}
        className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 text-gray-700" />
        ) : (
          <Play className="h-4 w-4 text-gray-700 ml-0.5" />
        )}
      </button>

      {/* 時間顯示 */}
      <span className="text-sm text-gray-600 min-w-[60px]">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      {/* 進度條 */}
      <div className="flex-1 relative">
        <div
          ref={progressRef}
          className="relative h-1 bg-gray-300 rounded-full cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="absolute top-0 left-0 h-full bg-gray-700 rounded-full transition-all duration-200"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      </div>

      {/* 音量控制 */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="h-3 w-3 text-gray-600" />
          ) : (
            <Volume2 className="h-3 w-3 text-gray-600" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* 更多選項 */}
      <button className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded transition-colors">
        <MoreHorizontal className="h-3 w-3 text-gray-600" />
      </button>
    </div>
  )
}
