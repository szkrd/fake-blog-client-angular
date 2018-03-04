export interface HeaderLinkItem {
  _page?: string | number;
  _limit?: string | number;
  _include?: string;
  _expand?: string[] | string;
  _count?: string;
  url?: string;
  rel?: string;
  q?: string;
  'tags@slug_includes'?: string;
}
