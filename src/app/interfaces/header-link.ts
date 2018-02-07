import { HeaderLinkItem } from './header-link-item';

export interface HeaderLink {
  next?: HeaderLinkItem;
  prev?: HeaderLinkItem;
  first?: HeaderLinkItem;
  last?: HeaderLinkItem;
}
