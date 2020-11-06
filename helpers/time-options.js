import moment from 'moment';

export const getTimeOptions = () => {
  let id = 1;
  let time = moment(String(12.00), 'kk.mm');
  let timeOptions = [];
  while (time.isBefore(moment(String(12.00), 'kk.mm').add(24, 'h'))) {
    timeOptions.push({
      id,
      name: time.format('LT')
    })
    id++;
    time = moment(time).add(15, 'm');
  }
  return timeOptions;
}