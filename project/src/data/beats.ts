import { Beat } from '../types/Beat';

// Sample data for beats
export const allBeats: Beat[] = [
  {
    id: 1,
    title: "Midnight Dreams",
    producer: "WTD.TY",
    price: 49.99,
    imageUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-9s.mp3",
    genre: "Trap",
    bpm: 140,
    key: "C Minor",
    duration: 210,
    dateAdded: "2025-06-01",
    tags: ["dark", "atmospheric", "trap"],
    featured: true,
    files: {
      mp3: "https://samplelib.com/lib/preview/mp3/sample-9s.mp3",
      wav: "https://samplelib.com/lib/preview/wav/sample-9s.wav",
      stems: [
        "https://samplelib.com/lib/preview/wav/sample-3s.wav",
        "https://samplelib.com/lib/preview/wav/sample-6s.wav",
        "https://samplelib.com/lib/preview/wav/sample-12s.wav"
      ]
    }
  },
  {
    id: 2,
    title: "Summer Vibes",
    producer: "WTD.TY",
    price: 59.99,
    imageUrl: "https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-15s.mp3",
    genre: "Hip Hop",
    bpm: 95,
    key: "G Major",
    duration: 180,
    dateAdded: "2025-06-02",
    tags: ["summer", "chill", "hip hop"],
    featured: true,
    files: {
      mp3: "https://samplelib.com/lib/preview/mp3/sample-15s.mp3",
      wav: "https://samplelib.com/lib/preview/wav/sample-15s.wav",
      stems: [
        "https://samplelib.com/lib/preview/wav/sample-3s.wav",
        "https://samplelib.com/lib/preview/wav/sample-6s.wav",
        "https://samplelib.com/lib/preview/wav/sample-12s.wav"
      ]
    }
  },
  {
    id: 3,
    title: "Electric Soul",
    producer: "WTD.TY",
    price: 44.99,
    imageUrl: "https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    genre: "R&B",
    bpm: 85,
    key: "D Minor",
    duration: 195,
    dateAdded: "2025-06-03",
    tags: ["rnb", "soul", "electronic"],
    featured: false,
    files: {
      mp3: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
      wav: "https://samplelib.com/lib/preview/wav/sample-12s.wav",
      stems: [
        "https://samplelib.com/lib/preview/wav/sample-3s.wav",
        "https://samplelib.com/lib/preview/wav/sample-6s.wav",
        "https://samplelib.com/lib/preview/wav/sample-12s.wav"
      ]
    }
  },
  {
    id: 4,
    title: "Don Tol",
    producer: "WTD.TY",
    price: 54.99,
    imageUrl: "https://images.pexels.com/photos/1010519/pexels-photo-1010519.jpeg",
    audioUrl: "https://samplelib.com/lib/preview/wav/sample-15s.wav",
    genre: "Hip Hop",
    bpm: 90,
    key: "A Minor",
    duration: 180,
    dateAdded: "2025-06-04",
    tags: ["hip hop", "smooth", "melodic"],
    featured: true,
    files: {
      wav: "https://samplelib.com/lib/preview/wav/sample-15s.wav"
    }
  }
];

// Export featured beats by filtering allBeats
export const featuredBeats = allBeats.filter(beat => beat.featured);