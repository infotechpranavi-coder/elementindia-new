export function formatBlogDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatReadTime(minutes: number) {
  const safe = Number.isFinite(minutes) && minutes > 0 ? Math.round(minutes) : 1;
  return `${safe} min read`;
}

export function estimateReadTimeMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
