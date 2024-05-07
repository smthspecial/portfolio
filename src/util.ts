export const getRandomColor = () => {
  const colorNames = [
    "orange",
    "red",
    "yellow",
    "green",
    "emerald",
    "teal",
    "cyan",
    "blue",
    "indigo",
    "violet",
    "purple",
    "pink",
  ];
  const colorBrightness = 500;
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  return `${colorNames[randomIndex]}-${colorBrightness}`;
};

interface YearMonth {
  year: number;
  month: number;
}

export function getYearsAndMonthsInRange(startDate: Date, endDate: Date): YearMonth[] {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();
  const yearsAndMonthsInRange: YearMonth[] = [];

  for (let year = startYear; year <= endYear; year++) {
      const start = (year === startYear) ? startMonth : 0;
      const end = (year === endYear) ? endMonth : 11;

      for (let month = start; month <= end; month++) {
          yearsAndMonthsInRange.push({ year, month });
      }
  }

  return yearsAndMonthsInRange;
}