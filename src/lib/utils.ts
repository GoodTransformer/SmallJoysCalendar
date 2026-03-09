export function withBase(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const trimmedBase = base.endsWith('/') ? base : `${base}/`;
  return `${trimmedBase}${path.replace(/^\/+/, '')}`;
}

export function getActivityHref(activityId: string) {
  return withBase(`/activities/${activityId}/`);
}

type ActivitySummaryInput = {
  activityName: string;
  venueName: string;
  location?: string;
};

export function getActivityOverview(activity: ActivitySummaryInput) {
  const location = activity.location ? ` in ${activity.location}` : '';
  return `${activity.activityName} at ${activity.venueName}${location}.`;
}

export function getGoogleMapsSearchHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getActivityMapsTarget(venueName: string, location: string) {
  return /varies by session venue|norfolk workshop venue/i.test(location)
    ? venueName
    : `${venueName}, ${location}`;
}

export function slugToTitle(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
