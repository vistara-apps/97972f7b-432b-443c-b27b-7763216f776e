export const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

export const COMMON_SCENARIOS = [
  'Traffic Stop',
  'Street Questioning',
  'Home Visit',
  'Workplace Interaction',
  'Public Space Encounter',
  'Vehicle Search Request',
  'ID Request',
  'Consent to Search'
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' }
];

export const SAMPLE_SCRIPTS = {
  'Traffic Stop': {
    en: "I am exercising my right to remain silent. I do not consent to any searches. Am I free to go?",
    es: "Estoy ejerciendo mi derecho a permanecer en silencio. No consiento ningún registro. ¿Soy libre de irme?"
  },
  'Street Questioning': {
    en: "I am exercising my right to remain silent. I would like to speak to a lawyer. Am I being detained?",
    es: "Estoy ejerciendo mi derecho a permanecer en silencio. Me gustaría hablar con un abogado. ¿Estoy siendo detenido?"
  }
};

export const SAMPLE_STATE_GUIDES = {
  'California': {
    dos: [
      'Remain calm and polite',
      'Keep your hands visible',
      'Ask if you are free to go',
      'Request a lawyer if arrested'
    ],
    donts: [
      'Do not resist physically',
      'Do not consent to searches',
      'Do not answer questions without a lawyer',
      'Do not make sudden movements'
    ],
    key_rights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to ask if you are free to go',
      'Right to a lawyer'
    ],
    legal_citations: [
      'Miranda v. Arizona (1966)',
      'Terry v. Ohio (1968)',
      'California Penal Code § 148'
    ]
  }
};
