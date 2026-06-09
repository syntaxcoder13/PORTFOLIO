import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  youtubeId?: string;
  videoSrc?: string;
}

const VideoModal = ({ open, onClose, youtubeId, videoSrc }: VideoModalProps) => {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Lock body scroll / pause Lenis while open
  useEffect(() => {
    if (!open) return;

    const lenis = (window as any).lenis;
    const originalOverflow = document.body.style.overflow;

    if (lenis) {
      lenis.stop();
    } else {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (lenis) {
        lenis.start();
      } else {
        document.body.style.overflow = originalOverflow;
      }
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-5xl">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 sm:-top-14 sm:-right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 hover:scale-110"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 16:9 video container */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl" style={{ paddingBottom: '56.25%' }}>
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              controls
              playsInline
              className="absolute inset-0 h-full w-full border-0 object-contain"
            />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title="Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default VideoModal;
