"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Play} from 'lucide-react';
 
import Image from 'next/image';

export default function Home() {
    // const router = useRouter();

  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  

  // Debounced search effect
  useEffect(() => {
    console.log('ttttttttttterm',term);
    if (term.trim()) {
      const timer = setTimeout(() => {
        searchPodcasts(term);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [term]);
 

 

  const searchPodcasts = async (term:String) => {
    if (!term.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post('/api/search',{term});
      setResults(response.data.results || []);
console.log('results: from fronteeeeeeeee',  response.data.results);

      setHasSearched(true);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (term.trim()) {
      searchPodcasts(term);
    }
  };
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            iTunes<span className="text-purple-400"> Search API</span>
          </h1>
          <p className="text-gray-300 text-lg">Discover amazing podcasts from around the world</p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search through over 70 million podcats, episodes..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              />
              {loading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400"></div>
                </div>
              )}
            </div>
          </form>

          {/* Search Status Messages */}
          {!term.trim() && !hasSearched && (
            <p className="text-center text-gray-300 mt-4">Type in search to start discovering podcasts</p>
          )}
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="max-w-7xl mx-auto">
            {results.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Top podcasts for {term} 
                  </h2>
                </div>

                {/* Scrollable Cards Container */}
                <div className="overflow-x-auto pb-4">
                  <div className="flex space-x-6 min-w-max">
                    {results.map((podcast, index) => (
                    <a href={podcast.trackViewUrl}   key={index} > 
                     <div
                        className="flex-shrink-0 w-80 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                      >
                        {/* Podcast Artwork */}
                        <div className="relative mb-4">
                          <Image
  src={podcast.artworkUrl600 || '/placeholder.png'} // Fallback if undefined
  alt={podcast.collectionName || 'Podcast cover'}
  width={320} // Required
  height={320} // Required
  className="w-full h-48 object-cover rounded-xl"
  onError={(e) => {
    e.currentTarget.src = '/placeholder.png'; // Fallback on error
  }}
  unoptimized={true} // Required for external images
/>
                        
                          /> */}
                          <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <Play className="w-12 h-12 text-white" fill="currentColor" />
                          </div>
                        </div>

                        {/* Podcast Info */}
                        <div className="space-y-2">
                          <h3 className="font-bold text-white text-lg line-clamp-2 leading-tight">
                            {podcast.trackName}
                          </h3>
                          
                          <div className="flex items-center text-purple-300 text-sm">
                            <span className="truncate">{podcast.artistName}</span>
                          </div>

                          {/* {podcast.releaseDate && (
                            <div className="flex items-center text-gray-300 text-sm">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>{formatDate(podcast.releaseDate)}</span>
                            </div>
                          )} */}
                        </div>
                      </div>
                    </a>
                    
                    ))}
                  </div>
                </div>

                {/* Scroll Indicator */}
                {
                  
                  <div className="text-center mt-6">
                  <p className="text-gray-400 text-sm">
                    ← Swipe to see more podcasts →
                  </p>
                </div>}
              </>
            ) : (
              !loading && (
                <div className="text-center py-12">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No podcasts found</h3>
                    <p className="text-gray-300">Try searching with different keywords</p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}