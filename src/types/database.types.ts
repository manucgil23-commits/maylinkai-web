// src/types/database.types.ts
export interface EventRow {
  id?: string;
  type: string;
  element?: string | null;
  page_path?: string;
  user_id?: string;
  session_id?: string;
  device_type?: string;
  screen_resolution?: string;
  language?: string;
  timezone?: string;
  referrer?: string;
  is_first_visit?: boolean;
  time_spent_seconds?: number | null;
  scroll_depth_percent?: number | null;
  metadata?: any;
  created_at?: string;
}