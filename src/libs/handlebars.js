const timeago = require("timeago.js");

module.exports = {
  timeago: (date) => {
    return timeago.format(date);
  },
  hideNumber: (phoneNumber = '') => {
    return phoneNumber.replace(/[0-9]/g, "x");
  },
};
