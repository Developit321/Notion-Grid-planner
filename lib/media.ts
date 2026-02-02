const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".ogg", ".m4v"];

export function isVideoUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  try {
    const pathname = new URL(url).pathname;
    const lower = pathname.toLowerCase();
    return VIDEO_EXTENSIONS.some((ext) => lower.endsWith(ext));
  } catch {
    return false;
  }
}
