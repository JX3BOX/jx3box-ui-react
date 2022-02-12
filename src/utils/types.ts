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

export interface ThanksRecordItem {
  action_type: number;
  count: number;
  effect_log_id: number;
  article_id: string;
  created_at: string;
  deleted_at: string;
  ext_operate_user_info: {
    id: number;
    status: number;
    group: number;
    display_name: string;
    avatar: string;
    email: string;
  };
  ext_user_info: {
    id: number;
    status: number;
    group: number;
    display_name: string;
    avatar: string;
    email: string;
  };
  has_deleted: number;
  id: number;
  is_user_gift: number;
  operate_user_id: number;
  post_id: number;
  user_id: number;
  pay_order_id: string;
  post_type: string;
  remark: string;
}
