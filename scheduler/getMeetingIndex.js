// Splitting day hours into 30 minutes slots to have flexible time slots in a day.
const minutes_in_slot = 30;

// Return number of slots available and gives index of where to place meeting schedule on that day.
function getMeetingIndex(start_time, end_time) {
    var sTime = start_time.split(':');
    var lTime = end_time.split(':');
    return Math.floor(Math.abs(((new Date().setHours(sTime[0], sTime[1]) - new Date().setHours(lTime[0], lTime[1])) / 1000) / (minutes_in_slot * 60)));
}

module.exports = getMeetingIndex;