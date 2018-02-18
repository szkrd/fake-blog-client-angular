import { HeaderLinkItem } from './header-link-item';

export interface HeaderLink {
  totalCount?: number; // TODO it's a bit sloppy, detach it from header link please
  next?: HeaderLinkItem;
  prev?: HeaderLinkItem;
  first?: HeaderLinkItem;
  last?: HeaderLinkItem;
}
