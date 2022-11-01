import {
  differenceInHours,
  differenceInMonths,
  differenceInWeeks,
  isAfter,
  subYears,
} from 'date-fns';
import * as _ from 'lodash';
import * as faker from 'faker';

const MIN_VIEWS = 1;
const MAX_VIEWS = 10;
const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 24;
const WEEKS_IN_MONTH = 4;
const MAX_START_TIMESTAMP = subYears(new Date(), 2);

const getNumberOfItems = (startDate: Date) => {
  const now = new Date();
  const weeksInPeriod = differenceInWeeks(now, startDate);

  if (weeksInPeriod === 1) {
    return DAYS_IN_WEEK;
  }
  if (weeksInPeriod === 0) {
    return HOURS_IN_DAY;
  }
  if (weeksInPeriod > WEEKS_IN_MONTH) {
    return differenceInMonths(now, startDate);
  }

  return weeksInPeriod;
};

const generateDataForPeriod = (startDate: string | null) => {
  const now = new Date();
  const startInDateFormat = startDate
    ? new Date(startDate)
    : MAX_START_TIMESTAMP;
  const minMaxMultiplier = differenceInHours(now, startInDateFormat);
  const numberOfItems = getNumberOfItems(startInDateFormat);

  const unsortedData = Array.from({ length: numberOfItems }, () => ({
    timestamp: faker.date.between(startInDateFormat, now),
    views: faker.datatype.number({
      min: MIN_VIEWS * minMaxMultiplier,
      max: MAX_VIEWS * minMaxMultiplier,
    }),
  }));

  const sortedData = unsortedData.sort((a, b) =>
    isAfter(a.timestamp, b.timestamp) ? 0 : -1
  );

  return sortedData;
};

export const getMemoizedDataForPeriod = _.memoize(generateDataForPeriod);
