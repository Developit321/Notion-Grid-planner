"use client";

import { useEffect, useState } from "react";
import { Post, Platform } from "@/types";
import { Grid } from "@/components/Grid";
import { isVideoUrl } from "@/lib/media";

// Map Notion status colors to CSS colors
function getStatusColor(color: string | undefined): string {
  if (!color) return "";
  
  const colorMap: Record<string, string> = {
    default: "#9b9a97", // gray
    gray: "#9b9a97",
    brown: "#64473a",
    orange: "#d9730d",
    yellow: "#dfab01",
    green: "#0f7b6c",
    blue: "#0b6e99",
    purple: "#6940a5",
    pink: "#ad1a72",
    red: "#e03e3e",
  };
  
  return colorMap[color.toLowerCase()] || colorMap.default;
}

interface WidgetPageProps {
  params: { id: string };
}

export default function WidgetPage({ params }: WidgetPageProps) {
  const { id } = params;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activePlatform, setActivePlatform] = useState<Platform>("instagram");

  useEffect(() => {
    fetchPosts();
  }, [id]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/widgets/${id}/posts?t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (reorderedPosts: Post[]) => {
    // Update locally first for immediate UI feedback
    setPosts(reorderedPosts);
    
    // Persist reordering to Notion
    try {
      await fetch(`/api/widgets/${id}/reorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          posts: reorderedPosts.map((post) => ({
            id: post.id,
            order: post.order,
          })),
        }),
      });
    } catch (error) {
      console.error("Failed to persist reordering:", error);
      // Optionally show an error message to the user
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setCurrentImageIndex(0);
  };

  const handlePinToggle = async (post: Post) => {
    // Only allow pinning/unpinning posts in the first row (first 3 posts)
    // This check is also done in the Grid component, but double-check here for safety
    const filteredPosts = posts.filter((p) => p.platform === activePlatform);
    const postIndex = filteredPosts.findIndex((p) => p.id === post.id);
    
    // Only allow pinning posts in the first row (indices 0, 1, 2)
    // If unpinning, allow it regardless of position
    if (!post.pinned && postIndex >= 3) {
      // Don't allow pinning posts outside the first row
      return;
    }
    
    const newPinned = !post.pinned;
    
    // Update locally first for immediate UI feedback
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === post.id ? { ...p, pinned: newPinned } : p))
    );
    
    // Persist pinning to Notion
    try {
      const response = await fetch(`/api/widgets/${id}/pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: post.id,
          pinned: newPinned,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update pin state");
      }
      
      // Refresh posts to get the correct order after pinning
      await fetchPosts();
    } catch (error) {
      console.error("Failed to persist pinning:", error);
      // Revert on error
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === post.id ? { ...p, pinned: !newPinned } : p))
      );
    }
  };

  const closePreview = () => {
    setSelectedPost(null);
    setCurrentImageIndex(0);
  };

  const goToPrevImage = () => {
    if (selectedPost && selectedPost.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedPost.images.length - 1 : prev - 1
      );
    }
  };

  const goToNextImage = () => {
    if (selectedPost && selectedPost.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === selectedPost.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  useEffect(() => {
    if (!selectedPost) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
      if (e.key === "ArrowLeft") goToPrevImage();
      if (e.key === "ArrowRight") goToNextImage();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPost, currentImageIndex]);

  if (loading) {
    return (
      <div className="planner-loading">
        <div className="planner-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="planner-error">
        <p>{error}</p>
        <button type="button" className="btn-retry" onClick={fetchPosts}>
          Retry
        </button>
      </div>
    );
  }

  const hasMultipleImages = selectedPost && selectedPost.images.length > 1;

  // Filter posts by selected platform
  const filteredPosts = posts.filter((post) => post.platform === activePlatform);

  const platformTitle = activePlatform === "instagram" ? "Instagram Grid Planner" : "TikTok Grid Planner";

  return (
    <main className="planner-page">
      <div className="planner-wrap">
        <div className="planner-card">
          <header className="planner-header">
            <button type="button" className="btn-refresh" onClick={fetchPosts}>
              Refresh
            </button>
            <span className="planner-title">{platformTitle}</span>
          </header>

          {/* Platform toggle */}
          <div className="platform-toggle">
            <button
              type="button"
              className={`platform-btn ${activePlatform === "instagram" ? "active" : ""}`}
              onClick={() => setActivePlatform("instagram")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </button>
            <button
              type="button"
              className={`platform-btn ${activePlatform === "tiktok" ? "active" : ""}`}
              onClick={() => setActivePlatform("tiktok")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
              TikTok
            </button>
          </div>

          <div className="planner-grid-wrap">
            {filteredPosts.length === 0 ? (
              <div className="planner-empty">
                <div className="planner-empty-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p>No {activePlatform} posts yet</p>
                <p className="hint">Add posts with platform "{activePlatform}" in Notion</p>
              </div>
            ) : activePlatform === "tiktok" ? (
              <div className="tiktok-grid">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="tiktok-item"
                    onClick={() => handlePostClick(post)}
                  >
                    {post.images[0] && (
                      isVideoUrl(post.images[0]) ? (
                        <video
                          src={post.images[0]}
                          muted
                          preload="metadata"
                          playsInline
                          className="tiktok-thumbnail"
                        />
                      ) : (
                        <img
                          src={post.images[0]}
                          alt={post.name}
                          className="tiktok-thumbnail"
                        />
                      )
                    )}
                    {!post.images[0] && (
                      <div className="tiktok-placeholder">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      </div>
                    )}
                    {post.images.length > 1 && (
                      <div className="carousel-indicator">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <rect x="3" y="5" width="15" height="14" rx="2" />
                          <rect x="6" y="3" width="15" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <Grid
                posts={filteredPosts}
                onReorder={async (reordered) => {
                  // Merge reordered posts with other platform posts
                  const otherPosts = posts.filter((p) => p.platform !== activePlatform);
                  const allReordered = [...otherPosts, ...reordered];
                  setPosts(allReordered);
                  
                  // Persist reordering to Notion (only for the active platform posts)
                  try {
                    await fetch(`/api/widgets/${id}/reorder`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        posts: reordered.map((post) => ({
                          id: post.id,
                          order: post.order,
                        })),
                      }),
                    });
                  } catch (error) {
                    console.error("Failed to persist reordering:", error);
                  }
                }}
                onPostClick={handlePostClick}
                onPinToggle={handlePinToggle}
              />
            )}
          </div>

          <footer className="planner-footer">
            <p>{platformTitle}</p>
          </footer>
        </div>
      </div>

      {/* Image preview overlay */}
      {selectedPost && (
        <div className="preview-overlay" role="dialog" aria-modal="true" aria-label="Image preview">
          <div className="preview-backdrop" onClick={closePreview} aria-hidden="true" />
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <div className="preview-image-box">
              {selectedPost.images.length > 0 ? (
                (() => {
                  const currentUrl = selectedPost.images[currentImageIndex];
                  if (isVideoUrl(currentUrl)) {
                    return (
                      <video
                        key={currentImageIndex}
                        src={currentUrl}
                        controls
                        autoPlay
                        playsInline
                        className="preview-media preview-video"
                      />
                    );
                  }
                  return (
                    <img
                      key={currentImageIndex}
                      src={currentUrl}
                      alt={`${selectedPost.name} - ${currentImageIndex + 1}`}
                      className="preview-media"
                    />
                  );
                })()
              ) : (
                <div className="preview-no-image">No media</div>
              )}

              {/* Carousel navigation arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    className="carousel-nav carousel-prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevImage();
                    }}
                    aria-label="Previous image"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="carousel-nav carousel-next"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextImage();
                    }}
                    aria-label="Next image"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Close button */}
            <button
              type="button"
              className="btn-close"
              onClick={closePreview}
              aria-label="Close preview"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Caption and dots */}
            <div className="preview-caption">
              <p className="name">{selectedPost.name}</p>
              {selectedPost.caption && (
                <p className="caption">{selectedPost.caption}</p>
              )}
              {selectedPost.source && selectedPost.source.trim() && (
                <a
                  href={selectedPost.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-source-link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Source
                </a>
              )}
              <div className="preview-caption-footer">
                <span 
                  className="status" 
                  style={selectedPost.statusColor ? {
                    backgroundColor: getStatusColor(selectedPost.statusColor) + "20",
                    color: getStatusColor(selectedPost.statusColor),
                    border: `1px solid ${getStatusColor(selectedPost.statusColor)}40`
                  } : {}}
                >
                  {selectedPost.status}
                </span>
                {/* Carousel dots */}
                {hasMultipleImages && (
                  <div className="carousel-dots">
                    {selectedPost.images.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`carousel-dot ${idx === currentImageIndex ? "active" : ""}`}
                        onClick={() => setCurrentImageIndex(idx)}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
