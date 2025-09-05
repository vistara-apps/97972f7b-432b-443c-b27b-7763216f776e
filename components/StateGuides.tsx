'use client';

import { useState } from 'react';
import { Shield, MapPin, BookOpen, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { STATES, SAMPLE_STATE_GUIDES } from '@/lib/constants';

export function StateGuides() {
  const [selectedState, setSelectedState] = useState('California');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = STATES.filter(state =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentGuide = SAMPLE_STATE_GUIDES[selectedState as keyof typeof SAMPLE_STATE_GUIDES];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">State-Specific Legal Guides</h1>
          <p className="text-gray-300 mt-1">Know your rights in every state</p>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <MapPin className="w-6 h-6 text-blue-400" />
          <div>
            <div className="text-sm text-gray-300">Current State</div>
            <div className="font-semibold text-white">{selectedState}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* State Selection */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            Select State
          </h2>
          
          <input
            type="text"
            placeholder="Search states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          />

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredStates.map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  selectedState === state
                    ? 'bg-purple-500 bg-opacity-20 text-white border border-purple-500'
                    : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        {/* Guide Content */}
        <div className="lg:col-span-2 space-y-6">
          {currentGuide ? (
            <>
              {/* Do's */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  What You Should Do
                </h3>
                <div className="space-y-3">
                  {currentGuide.dos.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Don'ts */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  What You Should NOT Do
                </h3>
                <div className="space-y-3">
                  {currentGuide.donts.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Rights */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Your Key Rights
                </h3>
                <div className="space-y-3">
                  {currentGuide.key_rights.map((right, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-200">{right}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Citations */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-yellow-400" />
                  Legal Citations
                </h3>
                <div className="space-y-2">
                  {currentGuide.legal_citations.map((citation, index) => (
                    <div key={index} className="text-gray-300 font-mono text-sm bg-black bg-opacity-20 p-2 rounded">
                      {citation}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="glass-card p-12 text-center">
              <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Guide Not Available</h3>
              <p className="text-gray-300">
                Legal guide for {selectedState} is being prepared. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
