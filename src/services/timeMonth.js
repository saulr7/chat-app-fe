import moment from 'moment';

const timeMonth = (date = undefined) => {
  const todayMonth = moment(date);
  return todayMonth.format('HH:mm a | MMMM Do');
};

export default timeMonth;
