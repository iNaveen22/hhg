// Mock data for Hacker House Goa 2026 clone

export const EVENT = {
  name: 'Hacker House',
  location: 'Goa, India',
  dates: '28 — 31 Oct 2026',
  hashtag: '#FrameInGoa',
  short: 'HH GOA 2026',
};

export const ROLES = [
  'Builder', 'Hacker', 'Designer', 'Organiser', 'Mentor', 'Staff', 'Photographer', 'Volunteer', 'Custom'
];

export const FRAMES = [
  {
    id: 'pfp',
    name: 'Social PFP',
    category: 'pfp',
    tagline: 'A premium circular cutout for your social profiles.',
    bg: '#0a3d24',
    accent: '#f9df32',
    accent2: '#ec2f89',
  },
  {
    id: 'id-card',
    name: 'Event ID Badge',
    category: 'badge',
    tagline: 'The official physical VIP event lanyard badge.',
    bg: '#f7f1de',
    accent: '#f9df32',
    accent2: '#0a3d24',
  },
];

export const FRAME_CATEGORIES = ['All', 'PFP', 'Badge'];

export const generateId = () => {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `HH-26-${num}`;
};

export const STEPS = [
  { key: 'choose', label: 'Choose' },
  { key: 'details', label: 'Details' },
  { key: 'frame', label: 'Frame' },
  { key: 'generate', label: 'Generate' },
];