import moment from 'moment';

export function formatDate(date: Date, format = 'YYYY-MM-DD') {
  return moment(date).format(format);
}

export function getCurrentDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
  return today;
}
