import rawCalendar from './calendar.json';
import rawActivityImages from './activity-images.json';
import rawImageManifest from './image-manifest.json';

export type Activity = {
  id: string;
  activityName: string;
  whyItSuitsHer: string;
  venueName: string;
  location: string;
  driveTimeFromMarsham: string;
  bestQuietTime: string;
  timingFit: 'Wednesday' | 'Weekend' | 'Either';
  dogFriendly: 'Yes' | 'No' | 'Sometimes';
  estimatedCost: string;
  soloFriendBoyfriendFit: string;
  bookingLink: string;
  sourceName: string;
  whyThisMightHelpThisWeek: string;
  emotionalFit: string;
  likelyCrowdLevel: string;
  bookingNeeded: string;
  image?: {
    src: string;
    alt: string;
  };
  notes?: string;
  tags: string[];
  season: string;
  indoor: boolean;
  waterBased: boolean;
  priceBand: 'under-40' | 'around-80' | 'flex';
};

export type Week = {
  id: string;
  slug: string;
  label: string;
  dateRange: string;
  shortDateRange: string;
  emotionalTheme: string;
  anchorLabel: string;
  anchorActivityId: string;
  secondLabel: string;
  secondActivityId: string;
  summary: string;
};

export type Category = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  activityIds: string[];
};

export type PairedOuting = {
  title: string;
  description: string;
  activityIds?: string[];
  format?: 'same-day' | 'split-across-days';
  whyItWorks?: string;
  linkLabel?: string;
  link?: string;
};

export type CalendarData = {
  site: {
    recipientName?: string;
    title: string;
    description: string;
    intro: string;
    emotionalFraming: string;
    locationOverview: string[];
    editorNotes: string[];
  };
  profileSummary: string;
  designLogic: {
    summary: string;
    modes: string[];
    principles: string[];
  };
  weeks: Week[];
  activities: Activity[];
  categories: Category[];
  waterBasedRanked: {
    rank: number;
    activityId: string;
    note: string;
  }[];
  pairedOutings: PairedOuting[];
};

const activityImages = rawActivityImages as Record<string, { src: string; alt: string }>;

export const calendar = {
  ...rawCalendar,
  activities: rawCalendar.activities.map((activity) => ({
    ...activity,
    image: activityImages[activity.id] ?? activity.image
  }))
} as CalendarData;
export const imageManifest = rawImageManifest as {
  placeholders: { id: string; file: string; bestFor: string }[];
  replacementPattern: Record<string, string>;
};

export const activityMap = new Map(calendar.activities.map((activity) => [activity.id, activity]));
export const categoryMap = new Map(calendar.categories.map((category) => [category.slug, category]));

export function getActivity(id: string) {
  const activity = activityMap.get(id);
  if (!activity) {
    throw new Error(`Missing activity: ${id}`);
  }
  return activity;
}

export function getWeekActivities(week: Week) {
  return [getActivity(week.anchorActivityId), getActivity(week.secondActivityId)];
}
