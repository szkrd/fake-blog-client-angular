import {ArchiveMonth} from './archive-month';

export interface ArchiveYear {
  extended: boolean;
  year: number;
  count: number;
  months: ArchiveMonth[];
}
