import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Music, Headphones, Download, Clock, ChevronRight } from 'lucide-react';

import Hero from '../components/Hero';
import BeatCard from '../components/BeatCard';
import BeatPlayer from '../components/BeatPlayer';
import { Beat } from '../types/Beat';
import { featuredBeats } from '../data/beats';

const Home = () => {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const handlePlay = (beat: Beat) => {
    if (currentBeat && currentBeat.id === beat.id) {
      setIsPlaying(true);
    } else {
      setCurrentBeat(beat);
      setIsPlaying(true);
    }
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  const handleTimeUpdate = (time: number, totalDuration: number) => {
    setCurrentTime(time);
    setDuration(totalDuration);
  };
  
  return (
    <>
      <Hero />
      
      {/* Featured Beats */}
      <section className="py-20 bg-dark-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h5 className="text-primary-500 font-display tracking-widest mb-1">LISTEN NOW</h5>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Featured Beats</h2>
            </div>
            <Link to="/beats" className="hidden md:flex items-center text-primary-500 hover:text-primary-400 transition-colors">
              View All Beats <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredBeats.map((beat) => (
              <BeatCard 
                key={beat.id}
                beat={beat}
                isPlaying={isPlaying && currentBeat?.id === beat.id}
                onPlay={() => handlePlay(beat)}
                onPause={handlePause}
                currentTime={currentTime}
                duration={duration}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/beats" className="btn-outline">
              View All Beats
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Producer */}
      <section className="py-20 bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg" 
                  alt="Producer WTD.TY" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute top-8 left-8 right-8 bottom-8 border-2 border-primary-500 rounded-lg -z-0"></div>
            </div>
            
            <div>
              <h5 className="text-primary-500 font-display tracking-widest mb-1">THE PRODUCER</h5>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">WTD.TY</h2>
              <p className="text-gray-300 mb-6">
                With years of experience crafting unique soundscapes, WTD.TY brings a fresh perspective to beat production. 
                Specializing in a blend of modern trap, R&B, and experimental sounds, each beat is meticulously crafted 
                to help artists stand out in today's competitive music landscape.
              </p>
              <p className="text-gray-300 mb-8">
                Working with Blairing Records, WTD.TY has produced for emerging artists across the country, 
                helping them develop their unique sound and build their careers.
              </p>
              <Link to="/contact" className="btn-primary">
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-dark-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h5 className="text-primary-500 font-display tracking-widest mb-1">SIMPLE PROCESS</h5>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get the perfect beat for your next project in just a few simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Headphones size={28} className="text-primary-500" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">1. Browse & Preview</h3>
              <p className="text-gray-400">
                Explore our collection of premium beats and find the perfect one for your project.
              </p>
            </div>
            
            <div className="bg-dark-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Download size={28} className="text-primary-500" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">2. Choose License</h3>
              <p className="text-gray-400">
                Select the appropriate license for your needs and complete your purchase.
              </p>
            </div>
            
            <div className="bg-dark-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music size={28} className="text-primary-500" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">3. Download & Create</h3>
              <p className="text-gray-400">
                Download your high-quality beat files and start creating your next hit.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-900 opacity-90"></div>
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-dark-950 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-950 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Ready To Create Your Next Hit?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Browse our collection of premium beats and find the perfect sound for your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/beats" className="btn bg-white hover:bg-gray-100 text-primary-900 font-bold">
                Browse Beats
              </Link>
              <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Audio Player (hidden) */}
      <BeatPlayer 
        beat={currentBeat}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onTimeUpdate={handleTimeUpdate}
      />
    </>
  );
};

export default Home;