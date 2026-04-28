import React, { useRef, useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import { MOCK_VIDEOS } from '../constants';

export default function VideoFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.6, // Fire when 60% of the video is visible
      }
    );

    const videoElements = containerRef.current?.querySelectorAll('.video-snap-item');
    videoElements?.forEach((el) => observer.observe(el));

    return () => {
      videoElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100dvh-64px)] w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar bg-black"
    >
      {MOCK_VIDEOS.map((video, index) => (
        <div
          key={video.id}
          data-index={index}
          className="video-snap-item h-[calc(100dvh-64px)] w-full snap-start"
        >
          <VideoPlayer video={video} isActive={activeIndex === index} />
        </div>
      ))}
    </div>
  );
}
