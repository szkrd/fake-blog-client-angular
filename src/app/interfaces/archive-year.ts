import {ArchiveMonth} from './archive-month';

export interface ArchiveYear {
  year: number;
  count: number;
  months: ArchiveMonth[];
}
