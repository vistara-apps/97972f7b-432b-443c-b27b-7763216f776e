import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}

export function getCurrentLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    });
  });
}

export function generateShareableCard(data: {
  state: string;
  rights: string[];
  emergency_contacts: string[];
}): string {
  return `🛡️ CitizenShield Rights Card - ${data.state}

Key Rights:
${data.rights.map(right => `• ${right}`).join('\n')}

Emergency Contacts: ${data.emergency_contacts.length} configured

Generated: ${new Date().toLocaleString()}
#CitizenShield #KnowYourRights`;
}

export async function generateAICard(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/generate-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate card');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error generating AI card:', error);
    throw error;
  }
}
