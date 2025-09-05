'use client';

import { useState, useEffect } from 'react';
import { Shield, Mic, AlertTriangle, Share2, TrendingUp, Users } from 'lucide-react';

interface DashboardStats {
  totalRecordings: number;
  emergencyAlerts: number;
  sharedCards: number;
  activeUsers: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRecordings: 0,
    emergencyAlerts: 0,
    sharedCards: 0,
    activeUsers: 0
  });

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {
      setStats({
        totalRecordings: 2540,
        emergencyAlerts: 156,
        sharedCards: 892,
        activeUsers: 1200
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    {
      id: 'record',
      label: 'Start Recording',
      icon: Mic,
      color: 'from-red-500 to-pink-500',
      action: () => setIsRecording(!isRecording)
    },
    {
      id: 'emergency',
      label: 'Emergency Alert',
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500',
      action: () => console.log('Emergency alert triggered')
    },
    {
      id: 'share',
      label: 'Share Rights Card',
      icon: Share2,
      color: 'from-blue-500 to-purple-500',
      action: () => console.log('Share card')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">CitizenShield</h1>
          <p className="text-gray-300 mt-1">Your Rights, Your Script, Your Shield</p>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <Shield className="w-8 h-8 text-purple-400" />
          <div>
            <div className="text-sm text-gray-300">Status</div>
            <div className="font-semibold text-green-400">Protected</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              className={`glass-card p-6 hover:bg-opacity-15 transition-all duration-200 group ${
                action.id === 'record' && isRecording ? 'recording-pulse' : ''
              }`}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{action.label}</h3>
              {action.id === 'record' && isRecording && (
                <div className="text-red-400 text-sm">● Recording Active</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-300">Total Recordings</div>
            <Mic className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalRecordings.toLocaleString()}</div>
          <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            +12% this month
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-300">Emergency Alerts</div>
            <AlertTriangle className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.emergencyAlerts}</div>
          <div className="text-xs text-gray-400 mt-1">Last 30 days</div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-300">Shared Cards</div>
            <Share2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.sharedCards}</div>
          <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            +8% this week
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-300">Active Users</div>
            <Users className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</div>
          <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            +15% growth
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'Recording started', time: '2 minutes ago', status: 'active' },
            { action: 'Emergency contact added', time: '1 hour ago', status: 'success' },
            { action: 'Rights card shared', time: '3 hours ago', status: 'info' },
            { action: 'State guide updated', time: '1 day ago', status: 'info' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-white border-opacity-10 last:border-b-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'active' ? 'bg-red-400' :
                  activity.status === 'success' ? 'bg-green-400' : 'bg-blue-400'
                }`} />
                <span className="text-white">{activity.action}</span>
              </div>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
