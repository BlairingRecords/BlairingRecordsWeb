export interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  imageUrl: string;
  audioUrl: string;
  genre: string;
  bpm: number;
  key: string;
  duration: number;
  dateAdded: string;
  tags: string[];
  featured: boolean;
  files: {
    mp3: string;
    wav?: string;
    stems?: string[];
  };
}