"use client";

import { useState } from "react";

const videos = [
  {
    id: 1,
    src: "/Slike/copy_179C13BF-3DB6-450C-8878-2DBF6E842901.mp4",
    title: "Strojno pranje tepiha",
  },
];

export default function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Naš Rad u Akciji
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Pogledajte kako profesionalno obavljamo naše usluge čišćenja
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => setSelectedVideo(video.id)}
            >
              <video
                className="w-full h-64 object-cover"
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              >
                <source src={video.src} type="video/mp4" />
                Vaš browser ne podržava video tag.
              </video>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative max-w-4xl w-full">
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
                onClick={() => setSelectedVideo(null)}
                aria-label="Zatvori"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <video
                className="w-full rounded-lg"
                controls
                autoPlay
                onClick={(e) => e.stopPropagation()}
              >
                <source
                  src={videos.find((v) => v.id === selectedVideo)?.src}
                  type="video/mp4"
                />
                Vaš browser ne podržava video tag.
              </video>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

