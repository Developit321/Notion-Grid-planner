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
}
