export const convertMillistoHMS = (ms: number) => {
  let seconds: string | number = Math.floor(ms / 1000);
  let minutes: string | number = Math.floor(seconds / 60);
  let hours: string | number = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return `${hours}:${minutes}:${seconds}`;
};

export const parseDate = (date: string) => {
  let splitStringDate = date.split('T')[0].split('-');
  return `${splitStringDate[2]}-${splitStringDate[1]}-${splitStringDate[0]}`;
};
