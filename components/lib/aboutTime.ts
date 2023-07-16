export function seconds(sec: number) {
  return sec * 1000;
}

export function minutes(min: number) {
  return seconds(60) * min;
}

export function hours(hour: number) {
  return hour * minutes(60);
}

export function days(day: number) {
  return hours(24) * day;
}
