import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import BeatCard from '../components/BeatCard';
import BeatPlayer from '../components/BeatPlayer';
import { Beat } from '../types/Beat';
import { allBeats } from '../data/beats';

const BeatsPage = () => {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [displayedBeats, setDisplayedBeats] = useState<Beat[]>(allBeats);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    genre: '',
    minBpm: '',
    maxBpm: '',
    key: '',
    sortBy: 'newest'
  });
  
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
  
  useEffect(() => {
    let filteredBeats = [...allBeats];
    
    if (searchTerm) {
      filteredBeats = filteredBeats.filter(beat => 
        beat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beat.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filters.genre) {
      filteredBeats = filteredBeats.filter(beat => 
        beat.genre.toLowerCase() === filters.genre.toLowerCase()
      );
    }
    
    if (filters.minBpm) {
      filteredBeats = filteredBeats.filter(beat => 
        beat.bpm >= parseInt(filters.minBpm)
      );
    }
    
    if (filters.maxBpm) {
      filteredBeats = filteredBeats.filter(beat => 
        beat.bpm <= parseInt(filters.maxBpm)
      );
    }
    
    if (filters.key) {
      filteredBeats = filteredBeats.filter(beat => 
        beat.key.toLowerCase() === filters.key.toLowerCase()
      );
    }
    
    if (filters.sortBy === 'newest') {
      filteredBeats.sort((a, b) => b.id - a.id);
    } else if (filters.sortBy === 'price-low') {
      filteredBeats.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      filteredBeats.sort((a, b) => b.price - a.price);
    }
    
    setDisplayedBeats(filteredBeats);
  }, [searchTerm, filters]);
  
  const genres = [...new Set(allBeats.map(beat => beat.genre))];
  const keys = [...new Set(allBeats.map(beat => beat.key))];
  
  const resetFilters = () => {
    setFilters({
      genre: '',
      minBpm: '',
      maxBpm: '',
      key: '',
      sortBy: 'newest'
    });
    setSearchTerm('');
  };
  
  return (
    <>
      <section className="pt-32 pb-12 bg-dark-900">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Browse Beats</h1>
          <p className="text-gray-300 max-w-2xl mb-8">
            Find the perfect beat for your next project. Use the filters to narrow down your search.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or genre..."
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto w-full flex items-center justify-center gap-2 py-2 px-4 bg-dark-800 border border-dark-600 rounded-md hover:bg-dark-700 transition-colors"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
            
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="md:w-auto w-full py-2 px-4 bg-dark-800 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          
          {showFilters && (
            <div className="bg-dark-800 p-6 rounded-lg mb-8 border border-dark-600">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-bold text-lg">Filters</h3>
                <button 
                  onClick={resetFilters}
                  className="text-primary-500 hover:text-primary-400 text-sm"
                >
                  Reset Filters
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Genre</label>
                  <select
                    value={filters.genre}
                    onChange={(e) => setFilters({...filters, genre: e.target.value})}
                    className="w-full py-2 px-3 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Key</label>
                  <select
                    value={filters.key}
                    onChange={(e) => setFilters({...filters, key: e.target.value})}
                    className="w-full py-2 px-3 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Keys</option>
                    {keys.map((key) => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Min BPM</label>
                  <input
                    type="number"
                    value={filters.minBpm}
                    onChange={(e) => setFilters({...filters, minBpm: e.target.value})}
                    placeholder="Min BPM"
                    className="w-full py-2 px-3 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Max BPM</label>
                  <input
                    type="number"
                    value={filters.maxBpm}
                    onChange={(e) => setFilters({...filters, maxBpm: e.target.value})}
                    placeholder="Max BPM"
                    className="w-full py-2 px-3 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          )}
          
          {displayedBeats.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-display font-bold mb-4">No beats found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters or search term.</p>
              <button 
                onClick={resetFilters}
                className="btn-primary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedBeats.map((beat) => (
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
          )}
        </div>
      </section>
      
      <BeatPlayer 
        beat={currentBeat}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onTimeUpdate={handleTimeUpdate}
      />
    </>
  );
};

export default BeatsPage;