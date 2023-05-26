export interface BadgeData {
  badge_sets: {[id: string]: FullBadge};
}

export interface FullBadge {
  versions: {[version: string]: BadgeVersion};
}

export interface BadgeVersion {
  image_url_1x: string;
  title: string;
}