'use client';

import { useState, useEffect } from 'react';
import { Mic, Square, Play, Pause, Download, MapPin, Clock } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export function Recording() {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
  });

  const [recordings, setRecordings] = useState([
    {
      id: '1',
      timestamp: '2024-01-15T10:30:00Z',
      duration: 180,
      location: 'Main St & 5th Ave, Los Angeles, CA',
      notes: 'Traffic stop interaction'
    },
    {
      id: '2',
      timestamp: '2024-01-14T15:45:00Z',
      duration: 95,
      location: 'Downtown Plaza, Los Angeles, CA',
      notes: 'Street questioning'
    }
  ]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (recordingState.isRecording && !recordingState.isPaused) {
      interval = setInterval(() => {
        setRecordingState(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [recordingState.isRecording, recordingState.isPaused]);

  const startRecording = async () => {
    try {
      // Get location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setRecordingState(prev => ({
            ...prev,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              address: 'Current Location' // In real app, reverse geocode this
            }
          }));
        });
      }

      setRecordingState(prev => ({
        ...prev,
        isRecording: true,
        duration: 0
      }));
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = () => {
    setRecordingState({
      isRecording: false,
      isPaused: false,
      duration: 0,
    });

    // Add to recordings list
    const newRecording = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      duration: recordingState.duration,
      location: recordingState.location?.address || 'Unknown Location',
      notes: ''
    };

    setRecordings(prev => [newRecording, ...prev]);
  };

  const togglePause = () => {
    setRecordingState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">One-Tap Incident Recorder</h1>
          <p className="text-gray-300 mt-1">Discreet recording with location tagging</p>
        </div>
        {recordingState.isRecording && (
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <div>
              <div className="text-sm text-gray-300">Recording</div>
              <div className="font-semibold text-white">{formatDuration(recordingState.duration)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Recording Controls */}
      <div className="glass-card p-8">
        <div className="text-center space-y-6">
          {!recordingState.isRecording ? (
            <>
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 shadow-2xl"
                   onClick={startRecording}>
                <Mic className="w-16 h-16 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Tap to Start Recording</h2>
                <p className="text-gray-300">One tap to begin secure audio/video recording</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center recording-pulse shadow-2xl">
                <Mic className="w-16 h-16 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Recording Active</h2>
                <div className="text-3xl font-mono text-red-400 mb-4">
                  {formatDuration(recordingState.duration)}
                </div>
                {recordingState.location && (
                  <div className="flex items-center justify-center gap-2 text-gray-300 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{recordingState.location.address}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={togglePause}
                  className="btn-secondary flex items-center gap-2"
                >
                  {recordingState.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  {recordingState.isPaused ? 'Resume' : 'Pause'}
                </button>
                <button
                  onClick={stopRecording}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  Stop
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recording History */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recording History</h2>
        
        {recordings.length === 0 ? (
          <div className="text-center py-8">
            <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No recordings yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recordings.map((recording) => (
              <div key={recording.id} className="bg-white bg-opacity-5 p-4 rounded-lg border border-white border-opacity-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                      <Mic className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {new Date(recording.timestamp).toLocaleDateString()} at{' '}
                        {new Date(recording.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="text-sm text-gray-300 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDuration(recording.duration)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {recording.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="btn-icon">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                {recording.notes && (
                  <div className="text-sm text-gray-300 mt-2 pl-13">
                    {recording.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
