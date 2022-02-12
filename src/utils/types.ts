export const tuple = <T extends string[]>(...args: T) => args;
export interface HeaderNavData {
  key: string;
  link: string;
  label: string;
  client: string;
  status: boolean;
  parentKey: string;
  children: HeaderNavData[];
  desc?: string;
}

export interface Jx3BoxUser {
  avatar: string;
  avatar_origin: string;
  name: string;
  bind_wx: number;
  group: number;
  status: number;
  uid: number;
}

export interface Jx3BoxUserAssets {
  expire_date: string;
  pro_expire_date: string;
  was_vip: number;
  total_day: number;
  pro_total_day: number;
  was_pro: number;
}

export interface UserLinks {
  msg: string;
  publish: string;
  dashboard: string;
  profile: string;
  homepage: string;
}
