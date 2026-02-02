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
}

export function GridItem({ post, onClick, onPinToggle, isDragging: isDraggingProp }: GridItemProps) {
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id });

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
      {...attributes}
      {...listeners}
      className={`grid-item ${isDragging ? "dragging" : ""}`}
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
