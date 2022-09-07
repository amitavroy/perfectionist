export interface IPaginatedData {
  current_page: number;
  data: unknown;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{ active: boolean; url: string | null; label: number }>;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}
