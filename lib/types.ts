export interface User {
  user_id: string;
  wallet_address: string;
  created_at: string;
  subscription_status: 'free' | 'premium' | 'lifetime';
  emergency_contacts: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface Recording {
  recording_id: string;
  user_id: string;
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  audio_url?: string;
  video_url?: string;
  notes?: string;
  duration?: number;
  status: 'recording' | 'stopped' | 'uploaded';
}

export interface StateGuide {
  guide_id: string;
  state_name: string;
  content: {
    dos: string[];
    donts: string[];
    key_rights: string[];
    legal_citations: string[];
  };
  last_updated: string;
}

export interface Script {
  script_id: string;
  scenario: string;
  content: string;
  language: string;
  state_specific?: string;
  user_id?: string;
}

export interface ShareableCard {
  id: string;
  title: string;
  content: string;
  location: string;
  timestamp: string;
  ipfs_hash?: string;
}

export type NavigationItem = {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
};
