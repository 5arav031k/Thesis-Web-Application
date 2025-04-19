export const convertDurationToMinutes = (duration: string | null): number => {
  if (duration === null) return 0;

  const hourMatch = duration.match(/(\d+)h/);
  const minuteMatch = duration.match(/(\d+)m/);
  const secondMatch = duration.match(/(\d+)s/);

  let totalMinutes = 0;

  if (hourMatch) {
    totalMinutes += parseInt(hourMatch[1]) * 60;
  }

  if (minuteMatch) {
    totalMinutes += parseInt(minuteMatch[1]);
  }

  if (secondMatch) {
    totalMinutes += parseInt(secondMatch[1]) / 60;
  }

  return totalMinutes;
};

export const copyAndSort = (
  launches: any[],
  columnKey: string,
  isSortedDescending?: boolean,
): any[] => {
  return launches.slice(0).sort((a: any, b: any) => {
    const valueA = a[columnKey];
    const valueB = b[columnKey];

    if (
      (valueA === null || typeof valueA === 'string') &&
      (valueB === null || typeof valueB === 'string') &&
      columnKey === 'duration'
    ) {
      const sortValueA = convertDurationToMinutes(valueA);
      const sortValueB = convertDurationToMinutes(valueB);

      return isSortedDescending ? sortValueB - sortValueA : sortValueA - sortValueB;
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return isSortedDescending ? valueB - valueA : valueA - valueB;
    }

    if (
      (typeof valueA === 'string' || valueA === null) &&
      (typeof valueB === 'string' || valueB === null)
    ) {
      if (valueA === null) return 1;
      if (valueB === null) return -1;

      return isSortedDescending ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
    }

    return 0;
  });
};
