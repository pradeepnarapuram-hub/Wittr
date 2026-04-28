/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  username: string;
  avatar: string;
}

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  user: User;
  caption: string;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  songName?: string;
}

export interface TextPost {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  likes: number;
}

export type AppView = 'feed' | 'search' | 'create' | 'inbox' | 'profile';
