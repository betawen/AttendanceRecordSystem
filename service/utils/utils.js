'use strict'

exports.getDateNumber = function () {
    let year = new Date().getFullYear().toString();
    let month = (new Date().getMonth()+ 1).toString();
    if(month.length <= 1) {
        month = '0' + month.toString()
    }
    let day = new Date().getDate().toString();
    if(day.length <= 1) {
        day = '0' + day
    }
    let date = parseInt(year + month + day);
    return date
};
