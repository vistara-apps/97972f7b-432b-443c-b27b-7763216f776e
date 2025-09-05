'use client';

import { useState } from 'react';
import { 
  Home, 
  Shield, 
  FileText, 
  Mic, 
  AlertTriangle, 
  Share2, 
  Settings2,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'guides', label: 'State Guides', icon: Shield },
  { id: 'scripts', label: 'Verbal Scripts', icon: FileText },
  { id: 'recording', label: 'Recording', icon: Mic },
  { id: 'emergency', label: 'Emergency Alerts', icon: AlertTriangle },
  { id: 'sharing', label: 'Share Cards', icon: Share2 },
  { id: 'locations', label: 'Locations', icon: MapPin },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings2 },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`glass-card h-full transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-white border-opacity-10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-400" />
              <span className="font-bold text-lg">CitizenShield</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="btn-icon p-2"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`sidebar-item w-full ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
