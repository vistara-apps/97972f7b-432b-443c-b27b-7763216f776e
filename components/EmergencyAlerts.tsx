'use client';

import { useState } from 'react';
import { AlertTriangle, Plus, Phone, Mail, Edit3, Trash2, Send } from 'lucide-react';
import { EmergencyContact } from '@/lib/types';

export function EmergencyAlerts() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      email: 'john@example.com'
    },
    {
      id: '2',
      name: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      email: 'jane@example.com'
    }
  ]);

  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState<Partial<EmergencyContact>>({
    name: '',
    phone: '',
    email: ''
  });

  const [alertSent, setAlertSent] = useState(false);

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        name: newContact.name,
        phone: newContact.phone,
        email: newContact.email
      };
      
      setContacts(prev => [...prev, contact]);
      setNewContact({ name: '', phone: '', email: '' });
      setIsAddingContact(false);
    }
  };

  const removeContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const sendEmergencyAlert = () => {
    // In a real app, this would send actual alerts
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Emergency Contact Alerts</h1>
          <p className="text-gray-300 mt-1">Instant notifications to your trusted contacts</p>
        </div>
        <button
          onClick={sendEmergencyAlert}
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200 flex items-center gap-2 shadow-lg"
        >
          <Send className="w-4 h-4" />
          Send Alert Now
        </button>
      </div>

      {/* Alert Status */}
      {alertSent && (
        <div className="glass-card p-4 border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <div>
              <div className="font-semibold text-green-400">Emergency Alert Sent</div>
              <div className="text-sm text-gray-300">All emergency contacts have been notified with your location</div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Button */}
      <div className="glass-card p-8">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 shadow-2xl"
               onClick={sendEmergencyAlert}>
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Emergency Alert</h2>
            <p className="text-gray-300">Tap to immediately notify all emergency contacts</p>
          </div>
          <div className="text-sm text-gray-400">
            This will send your current location and a link to any active recording
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Emergency Contacts</h2>
          <button
            onClick={() => setIsAddingContact(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Contact
          </button>
        </div>

        {/* Add Contact Form */}
        {isAddingContact && (
          <div className="bg-white bg-opacity-5 p-4 rounded-lg border border-white border-opacity-10 mb-6">
            <h3 className="font-semibold text-white mb-4">Add New Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  value={newContact.name || ''}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter contact name"
                  className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                <input
                  type="tel"
                  value={newContact.phone || ''}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                  className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={newContact.email || ''}
                  onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                  className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={addContact} className="btn-primary">Add Contact</button>
              <button 
                onClick={() => setIsAddingContact(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Contacts List */}
        {contacts.length === 0 ? (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No emergency contacts added yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-white bg-opacity-5 p-4 rounded-lg border border-white border-opacity-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-semibold">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{contact.name}</div>
                      <div className="text-sm text-gray-300 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {contact.phone}
                        </span>
                        {contact.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {contact.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-icon">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removeContact(contact.id)}
                      className="btn-icon hover:bg-red-500 hover:bg-opacity-20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alert Settings */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Alert Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Include Location</div>
              <div className="text-sm text-gray-300">Send current GPS coordinates with alert</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Include Recording Link</div>
              <div className="text-sm text-gray-300">Send link to active recording if available</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Auto-Alert on Recording</div>
              <div className="text-sm text-gray-300">Automatically send alert when recording starts</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
