"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Post } from "@/types";
import { useState, useRef } from "react";
import { isVideoUrl } from "@/lib/media";

interface GridItemProps {
  post: Post;
  onClick: () => void;
  onPinToggle?: () => void;
  isDragging?: boolean;
  isInFirstRow?: boolean; // Whether this post is in the first row (can be pinned)
}

export function GridItem({ post, onClick, onPinToggle, isDragging: isDraggingProp, isInFirstRow = false }: GridItemProps) {
  const [imageError, setImageError] = useState(false);
  const [showUnpinTooltip, setShowUnpinTooltip] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Disable dragging for pinned posts
  const isPinned = post.pinned || !!post.pinnedPlacement;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: post.id,
    disabled: isPinned, // Disable dragging for pinned posts
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const hasMultipleMedia = post.images.length > 1;
  const firstMedia = post.images[0];
  const isVideo = firstMedia && isVideoUrl(firstMedia);

  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isPinned ? {} : attributes)} // Only apply drag attributes if not pinned
      {...(isPinned ? {} : listeners)} // Only apply drag listeners if not pinned
      className={`grid-item ${isDragging ? "dragging" : ""} ${isPinned ? "pinned-no-drag" : ""}`}
      onClick={(e) => {
        if (!isDragging) {
          onClick();
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {firstMedia && !imageError ? (
        isVideo ? (
          <video
            ref={videoRef}
            src={firstMedia}
            muted
            loop
            preload="metadata"
            playsInline
            className="grid-item-video"
          />
        ) : (
          <img
            src={firstMedia}
            alt={post.name}
            draggable={false}
            onError={() => setImageError(true)}
          />
        )
      ) : (
        <div className="grid-placeholder">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
      )}

      {/* Pin button - only show on pinned posts (which should be in first row) */}
      {post.pinned && onPinToggle && isInFirstRow && (
        <div 
          className="pin-btn-wrapper"
          onMouseEnter={() => setShowUnpinTooltip(true)}
          onMouseLeave={() => setShowUnpinTooltip(false)}
        >
          <button
            className="pin-btn pinned"
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-label="Unpin post"
            title="Unpin post"
          >
            <img src="/images/pin.png" alt="" className="pin-icon" aria-hidden="true" />
          </button>
          
          {/* Unpin tooltip */}
          {showUnpinTooltip && (
            <div className="unpin-tooltip">
              <p>Unpin this post?</p>
              <button
                className="unpin-confirm-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onPinToggle();
                  setShowUnpinTooltip(false);
                }}
              >
                Unpin
              </button>
            </div>
          )}
        </div>
      )}

      {/* Carousel indicator - shows when post has multiple images/videos */}
      {hasMultipleMedia && (
        <div className="carousel-indicator">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="5" width="15" height="14" rx="2" />
            <rect x="6" y="3" width="15" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </div>
  );
}
