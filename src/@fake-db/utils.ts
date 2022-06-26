// ** Returns paginated array
export const paginateArray = (array: any[], perPage: number, page: number) => {
  return array.slice((page - 1) * perPage, page * perPage);
};

// ** Returns sorted array
export const sortCompare = (key: any) => (a: any, b: any) => {
  const fieldA = a[key];
  const fieldB = b[key];

  let comparison = 0;
  if (fieldA > fieldB) {
    comparison = 1;
  } else if (fieldA < fieldB) {
    comparison = -1;
  }
  return comparison;
};

// ** Returns number range
export const getRandomInt = (min: number, max: number) => {
  if (min > max) {
    const temp = max;
    max = min;
    min = temp;
  }

  if (min <= 0) {
    return Math.floor(Math.random() * (max + Math.abs(min) + 1)) + min;
  }
  return Math.floor(Math.random() * max) + min;
};

// ** Returns random date
export const randomDate = (start: Date, end: Date) => {
  const diff = end.getTime() - start.getTime();
  const newDiff = diff * Math.random();
  return new Date(start.getTime() + newDiff);
};
