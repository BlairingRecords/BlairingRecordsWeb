import React, { useEffect, useState, useRef } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioElement?: HTMLAudioElement | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, audioElement }) => {
  const [audioData, setAudioData] = useState<number[]>(Array(48).fill(5));
  const animationFrameRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  
  useEffect(() => {
    if (!audioElement) return;

    const initializeAudio = async () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }
        
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        
        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        sourceRef.current = source;
      } catch (error) {
        console.error('Failed to initialize audio:', error);
      }
    };

    if (!audioContextRef.current && audioElement) {
      initializeAudio();
    }

    return () => {
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
        analyserRef.current = null;
        sourceRef.current = null;
      }
    };
  }, [audioElement]);

  useEffect(() => {
    if (!analyserRef.current || !isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      
      const bars = Array.from({ length: 48 }, (_, i) => {
        const start = Math.floor(i * dataArray.length / 48);
        const end = Math.floor((i + 1) * dataArray.length / 48);
        const slice = dataArray.slice(start, end);
        const average = slice.reduce((a, b) => a + b, 0) / slice.length;
        return Math.max(5, Math.min(50, average / 4));
      });
      
      setAudioData(bars);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      const fadeInterval = setInterval(() => {
        setAudioData(prev => {
          const newData = prev.map(height => Math.max(5, height * 0.95));
          if (newData.every(height => height <= 5)) {
            clearInterval(fadeInterval);
          }
          return newData;
        });
      }, 50);

      return () => clearInterval(fadeInterval);
    }
  }, [isPlaying]);
  
  return (
    <div className="visualizer">
      {audioData.map((height, index) => (
        <div 
          key={index}
          className="visualizer-bar"
          style={{ 
            height: `${height}px`,
            backgroundColor: `hsl(${160 + height * 2}, 70%, ${40 + height}%)`,
            transition: 'height 0.1s ease, background-color 0.2s ease'
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;