export const pad = (string: string) => {
  return `0${string}`.slice(-2);
};

export const format = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(String(date.getUTCSeconds()));
  if (hh) {
    return `${hh}:${pad(String(mm))}:${ss}`;
  }
  return `${mm}:${ss}`;
};