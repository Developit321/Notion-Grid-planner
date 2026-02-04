export type Platform = "instagram" | "tiktok";

export interface Post {
  id: string;
  name: string;
  images: string[];
  status: string;
  statusColor?: string;
  caption: string;
  order: number;
  pinned: boolean;
  platform: Platform;
  source?: string;
  date?: string; // ISO date string for chronological sorting
  pinnedPlacement?: number; // Pinned placement value: 1, 2, or 3 (from "Pinned Placement" multi-select)
}
