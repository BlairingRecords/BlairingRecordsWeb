import React, { useState, useRef, useEffect } from 'react';
import { Beat } from '../types/Beat';
import { Play, Pause, ShoppingCart } from 'lucide-react';

interface BeatPlayerProps {
  beat: Beat | null;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  onTimeUpdate: (currentTime: number, duration: number) => void;
}

const BeatPlayer: React.FC<BeatPlayerProps> = ({ 
  beat, 
  isPlaying, 
  setIsPlaying,
  onTimeUpdate 
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowMiniPlayer(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      if (isPlaying && audio.paused) {
        audio.play().catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      }
    };

    const handleLoadedMetadata = () => {
      onTimeUpdate(0, audio.duration);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [isPlaying, setIsPlaying, onTimeUpdate]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !isLoading && audio.paused) {
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else if (!isPlaying && !audio.paused) {
      audio.pause();
    }
  }, [isPlaying, isLoading, setIsPlaying]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsLoading(true);
    audio.pause();
    audio.currentTime = 0;

    if (beat) {
      audio.src = beat.audioUrl;
      audio.load();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute('src');
    };
  }, [beat]);
  
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      onTimeUpdate(audio.currentTime, audio.duration);
    }
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };
  
  return (
    <>
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="hidden"
      />
      
      {showMiniPlayer && beat && (
        <div className="fixed bottom-0 left-0 right-0 bg-dark-900/95 backdrop-blur-sm border-t border-dark-800 p-4 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={beat.imageUrl} 
                alt={beat.title} 
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <h4 className="font-bold">{beat.title}</h4>
                <p className="text-sm text-gray-400">{beat.genre} • {beat.bpm} BPM</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={handlePlayPause}
                className="relative bg-primary-600 hover:bg-primary-700 text-white rounded-full p-2 transition-all duration-300"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying && (
                  <div className="absolute inset-0 bg-primary-500/20 rounded-full animate-ping"></div>
                )}
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="text-primary-500 font-bold">${beat.price}</span>
                <button className="btn-primary">
                  <ShoppingCart size={16} className="mr-2" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark-800">
            <div 
              className="h-full bg-primary-500 transition-all duration-100"
              style={{ 
                width: audioRef.current ? 
                  `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%` : '0%' 
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default BeatPlayer;