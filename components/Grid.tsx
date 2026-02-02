"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Post } from "@/types";
import { GridItem } from "./GridItem";
import { useState } from "react";
import { isVideoUrl } from "@/lib/media";

interface GridProps {
  posts: Post[];
  onReorder: (posts: Post[]) => void;
  onPostClick: (post: Post) => void;
  onPinToggle: (post: Post) => void;
}

export function Grid({ posts, onReorder, onPostClick }: GridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = posts.findIndex((post) => post.id === active.id);
      const newIndex = posts.findIndex((post) => post.id === over.id);

      const reorderedPosts = arrayMove(posts, oldIndex, newIndex).map(
        (post, index) => ({
          ...post,
          order: index + 1,
        })
      );

      onReorder(reorderedPosts);
    }
  };

  const activePost = activeId ? posts.find((p) => p.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={posts.map((p) => p.id)} strategy={rectSortingStrategy}>
        <div className="instagram-grid">
          {posts.map((post) => (
            <GridItem
              key={post.id}
              post={post}
              onClick={() => onPostClick(post)}
              isDragging={post.id === activeId}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activePost ? (
          <div className="drag-overlay-cell">
            {activePost.images && activePost.images[0] ? (
              isVideoUrl(activePost.images[0]) ? (
                <video
                  src={activePost.images[0]}
                  muted
                  preload="metadata"
                  playsInline
                  className="drag-overlay-video"
                />
              ) : (
                <img
                  src={activePost.images[0]}
                  alt={activePost.name}
                />
              )
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#e5e5e5" }} />
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
