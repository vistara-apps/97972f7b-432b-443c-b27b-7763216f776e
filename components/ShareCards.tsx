'use client';

import { useState } from 'react';
import { Share2, Download, Copy, Sparkles, MapPin, Calendar } from 'lucide-react';
import { generateShareableCard } from '@/lib/utils';

interface ShareableCard {
  id: string;
  title: string;
  content: string;
  location: string;
  timestamp: string;
  state: string;
}

export function ShareCards() {
  const [cards, setCards] = useState<ShareableCard[]>([
    {
      id: '1',
      title: 'California Rights Card',
      content: '🛡️ CitizenShield Rights Card - California\n\nKey Rights:\n• Right to remain silent\n• Right to refuse consent to search\n• Right to ask if you are free to go\n• Right to a lawyer\n\nEmergency Contacts: 2 configured\n\nGenerated: 1/15/2024, 10:30 AM\n#CitizenShield #KnowYourRights',
      location: 'Los Angeles, CA',
      timestamp: '2024-01-15T10:30:00Z',
      state: 'California'
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedState, setSelectedState] = useState('California');

  const generateNewCard = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newCard: ShareableCard = {
        id: Date.now().toString(),
        title: `${selectedState} Rights Card`,
        content: generateShareableCard({
          state: selectedState,
          rights: [
            'Right to remain silent',
            'Right to refuse consent to search',
            'Right to ask if you are free to go',
            'Right to a lawyer'
          ],
          emergency_contacts: ['John Doe', 'Jane Smith']
        }),
        location: 'Current Location',
        timestamp: new Date().toISOString(),
        state: selectedState
      };
      
      setCards(prev => [newCard, ...prev]);
    } catch (error) {
      console.error('Failed to generate card:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const shareCard = (card: ShareableCard) => {
    if (navigator.share) {
      navigator.share({
        title: card.title,
        text: card.content,
      });
    } else {
      copyToClipboard(card.content);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Shareable Rights Cards</h1>
          <p className="text-gray-300 mt-1">AI-generated cards for social sharing</p>
        </div>
        <button
          onClick={generateNewCard}
          disabled={isGenerating}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          {isGenerating ? 'Generating...' : 'Generate Card'}
        </button>
      </div>

      {/* Card Generator */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Generate New Card</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="California" className="bg-gray-800">California</option>
              <option value="New York" className="bg-gray-800">New York</option>
              <option value="Texas" className="bg-gray-800">Texas</option>
              <option value="Florida" className="bg-gray-800">Florida</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Context</label>
            <select className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="general" className="bg-gray-800">General Rights</option>
              <option value="traffic" className="bg-gray-800">Traffic Stop</option>
              <option value="street" className="bg-gray-800">Street Encounter</option>
              <option value="home" className="bg-gray-800">Home Visit</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-lg p-4">
          <h3 className="font-semibold text-blue-300 mb-2">AI Card Generation</h3>
          <p className="text-sm text-blue-200">
            Our AI will create a personalized rights card based on your location, selected state laws, 
            and current context. The card will include relevant legal information and emergency contact details.
          </p>
        </div>
      </div>

      {/* Generated Cards */}
      <div className="space-y-4">
        {cards.map((card) => (
          <div key={card.id} className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {card.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(card.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(card.content)}
                  className="btn-icon"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => shareCard(card)}
                  className="btn-icon"
                  title="Share card"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="btn-icon" title="Download as image">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card Preview */}
            <div className="bg-black bg-opacity-30 p-4 rounded-lg border border-white border-opacity-10">
              <pre className="text-gray-200 text-sm whitespace-pre-wrap font-mono">
                {card.content}
              </pre>
            </div>

            {/* Share Options */}
            <div className="mt-4 flex gap-2">
              <button className="btn-secondary text-sm">Share to Farcaster</button>
              <button className="btn-secondary text-sm">Share to Twitter</button>
              <button className="btn-secondary text-sm">Copy Link</button>
            </div>
          </div>
        ))}
      </div>

      {cards.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Share2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Cards Generated Yet</h3>
          <p className="text-gray-300">
            Generate your first shareable rights card to spread awareness about legal rights.
          </p>
        </div>
      )}
    </div>
  );
}
