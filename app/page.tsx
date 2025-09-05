'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';

import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { StateGuides } from '@/components/StateGuides';
import { VerbalScripts } from '@/components/VerbalScripts';
import { Recording } from '@/components/Recording';
import { EmergencyAlerts } from '@/components/EmergencyAlerts';
import { ShareCards } from '@/components/ShareCards';

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'guides':
        return <StateGuides />;
      case 'scripts':
        return <VerbalScripts />;
      case 'recording':
        return <Recording />;
      case 'emergency':
        return <EmergencyAlerts />;
      case 'sharing':
        return <ShareCards />;
      case 'locations':
        return <div className="text-white">Locations feature coming soon...</div>;
      case 'contacts':
        return <div className="text-white">Contacts feature coming soon...</div>;
      case 'settings':
        return <div className="text-white">Settings feature coming soon...</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <div className="flex-shrink-0">
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="glass-card m-4 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-white capitalize">
                {activeSection.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <Wallet>
                <ConnectWallet>
                  <Name />
                </ConnectWallet>
              </Wallet>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-4 pt-0">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
