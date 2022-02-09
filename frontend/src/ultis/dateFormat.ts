const dateFormat = (date: Date) => {
  const dateObj = new Date(date);

  let year = dateObj.getFullYear();
  let month: number | string = dateObj.getMonth() + 1;
  let dt: number | string = dateObj.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${dt}.${month}.${year}`;
};

export default dateFormat;
