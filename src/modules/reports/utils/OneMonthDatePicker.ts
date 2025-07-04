import dayjs from 'dayjs';

const OneMonthDatePicker = () => {
  const oneMonthDateRange = [dayjs().startOf('month'), dayjs().endOf('month')];
  return oneMonthDateRange;
};

export default OneMonthDatePicker;
