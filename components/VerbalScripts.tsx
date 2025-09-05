'use client';

import { useState } from 'react';
import { FileText, Copy, Languages, Plus, Edit3 } from 'lucide-react';
import { COMMON_SCENARIOS, LANGUAGES, SAMPLE_SCRIPTS } from '@/lib/constants';

export function VerbalScripts() {
  const [selectedScenario, setSelectedScenario] = useState('Traffic Stop');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [customScript, setCustomScript] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const currentScript = SAMPLE_SCRIPTS[selectedScenario as keyof typeof SAMPLE_SCRIPTS]?.[selectedLanguage as keyof typeof SAMPLE_SCRIPTS['Traffic Stop']] || '';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Verbal Defense Scripts</h1>
          <p className="text-gray-300 mt-1">Pre-written responses for common scenarios</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Custom Script
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            Scenarios
          </h2>
          
          <div className="space-y-2">
            {COMMON_SCENARIOS.map((scenario) => (
              <button
                key={scenario}
                onClick={() => setSelectedScenario(scenario)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  selectedScenario === scenario
                    ? 'bg-purple-500 bg-opacity-20 text-white border border-purple-500'
                    : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                {scenario}
              </button>
            ))}
          </div>

          {/* Language Selection */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Languages className="w-4 h-4 text-blue-400" />
              Language
            </h3>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-gray-800">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Script Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Script */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">
                {selectedScenario} Script
              </h3>
              <button
                onClick={() => copyToClipboard(currentScript)}
                className="btn-secondary flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
            
            <div className="bg-black bg-opacity-30 p-4 rounded-lg border border-white border-opacity-10">
              <p className="text-gray-200 leading-relaxed">
                {currentScript || 'Script not available for this scenario and language combination.'}
              </p>
            </div>

            <div className="mt-4 p-4 bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">Usage Tips:</h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Speak clearly and calmly</li>
                <li>• Repeat if necessary</li>
                <li>• Do not deviate from the script</li>
                <li>• Record the interaction if possible</li>
              </ul>
            </div>
          </div>

          {/* Custom Script Editor */}
          {isEditing && (
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-green-400" />
                Create Custom Script
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Scenario Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter scenario name..."
                    className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Script Content
                  </label>
                  <textarea
                    value={customScript}
                    onChange={(e) => setCustomScript(e.target.value)}
                    placeholder="Enter your custom script..."
                    rows={6}
                    className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>
                
                <div className="flex gap-3">
                  <button className="btn-primary">Save Script</button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-4 hover:bg-opacity-15 transition-all duration-200 cursor-pointer">
              <h4 className="font-semibold text-white mb-2">Practice Mode</h4>
              <p className="text-gray-300 text-sm">Practice reading scripts aloud</p>
            </div>
            <div className="glass-card p-4 hover:bg-opacity-15 transition-all duration-200 cursor-pointer">
              <h4 className="font-semibold text-white mb-2">Audio Playback</h4>
              <p className="text-gray-300 text-sm">Listen to script pronunciation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
