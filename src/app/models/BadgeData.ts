export interface BadgeData {
  data: FullBadge[];
}

export interface FullBadge {
  set_id: string;
  versions: BadgeVersion[];
}

export interface BadgeDict {
  [id: string]: ProperBadge;
}

export interface ProperBadge {
  versions: {[version: string]: BadgeVersion};
}

export interface BadgeVersion {
  id: string;
  image_url_1x: string;
  image_url_2x: string;
  image_url_4x: string;
  title: string;
  description: string;
  click_action: string | null;
  click_url: string | null;
}