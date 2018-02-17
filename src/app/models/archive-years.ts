import {ArchiveYear} from '../interfaces/archive-year';
import {ArchiveMonth} from '../interfaces/archive-month';

const getMonth = (n: number): number => {
  const date = new Date(n);
  return date.getMonth();
};

const getYear = (n: number): number => {
  const date = new Date(n);
  return date.getFullYear();
};

const getByYear = (arr: ArchiveYear[], year: number): ArchiveYear => {
  return arr.find(item => item.year === year);
};

// TODO use proper iterable?
export class ArchiveYears extends Array<ArchiveYear> {
  constructor (dates: number[]) {
    super();

    const yearMap = {};
    dates = dates.slice().sort((a, b) => a - b);

    dates.forEach(n => {
      const year = String(getYear(n));
      yearMap[year] = yearMap[year] || [];
      yearMap[year].push(n);
    });

    Object.keys(yearMap).forEach(year => {
      const monthMap = {};
      const monthsNums: number[] = yearMap[year].sort((a, b) => a - b);
      const months: ArchiveMonth[] = [];

      monthsNums.forEach(n => {
        const month = String(getMonth(n));
        monthMap[month] = monthMap[month] || [];
        monthMap[month].push(n);
      });

      Object.keys(monthMap).forEach(month => {
        const current = monthMap[month].slice().sort((a, b) => a - b);
        months.push({
          id: +`${year}${month}`,
          month: +month,
          dates: current,
          count: current.length,
          minDate: current[0],
          maxDate: current[current.length - 1]
        });
      });

      this.unshift({
        year: +year,
        count: yearMap[year].length,
        months
      });
    });
  }
}
