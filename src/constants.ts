import { Video } from './types';

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&auto=format&fit=crop&q=60',
    user: {
      id: 'alex',
      username: 'alex_creative',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    },
    caption: 'My first micro-vlog on Wittr! 🚀 #vlog #newapp',
    hashtags: ['vlog', 'newapp'],
    likes: 1240,
    comments: 89,
    shares: 45,
    songName: 'Chill Vibes - Wittr Originals',
  },
  {
    id: '2',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60',
    user: {
      id: 'pradeep',
      username: 'pradeep_n',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pradeep',
    },
    caption: 'Trying out the new vertical feed. So smooth! ✨',
    hashtags: ['smooth', 'tech'],
    likes: 850,
    comments: 42,
    shares: 12,
    songName: 'Night City - Pradeep Beats',
  },
  {
    id: '3',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=60',
    user: {
      id: 'mudit',
      username: 'mudit_s',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mudit',
    },
    caption: 'Weekend escape to the mountains. #nature #vlog',
    hashtags: ['nature', 'vlog'],
    likes: 3100,
    comments: 156,
    shares: 88,
    songName: 'Mountain Air - Acoustic',
  },
];
