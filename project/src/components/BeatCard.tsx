import React, { useState } from 'react';
import { Play, Pause, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Beat } from '../types/Beat';

interface BeatCardProps {
  beat: Beat;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  currentTime: number;
  duration: number;
}

const BeatCard: React.FC<BeatCardProps> = ({ 
  beat, 
  isPlaying, 
  onPlay, 
  onPause,
  currentTime,
  duration
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const handleBuyNow = () => {
    navigate('/checkout', { state: { beat } });
  };
  
  return (
    <div 
      className="beat-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-dark-800">
        <img 
          src={beat.imageUrl} 
          alt={beat.title} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent opacity-70"></div>
        
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isPlaying ? 'animate-pulse-ring' : ''}`}>
          <button
            onClick={handlePlayPause}
            className="relative z-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-primary-500/20"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          {isPlaying && (
            <div className="absolute inset-0 bg-primary-500/20 rounded-full animate-ping"></div>
          )}
        </div>
        
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark-800/50">
            <div 
              className="h-full bg-primary-500 transition-all duration-100"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-display text-lg font-bold tracking-tight truncate">{beat.title}</h3>
          <span className="text-primary-500 font-bold">${beat.price}</span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-400">
            <span>{beat.bpm} BPM</span>
            <span className="mx-2">•</span>
            <span>{beat.key}</span>
          </div>
          <span className="text-xs px-2 py-1 bg-dark-800 rounded-full text-primary-300">
            {beat.genre}
          </span>
        </div>
        
        {isPlaying && (
          <div className="mb-4">
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}
        
        <button 
          className="w-full btn-primary"
          onClick={handleBuyNow}
        >
          <ShoppingCart size={16} className="mr-2" />
          Buy Now
        </button>
      </div>
    </div>
  );
};

// Helper function to format time in MM:SS
const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default BeatCard;