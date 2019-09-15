// Let's bring up some needed functions
const isSlotAvailable = require('./isSlotAvailable');
const getMeetingIndex = require('./getMeetingIndex');

function fillArrayWithTimeSlots(meeting_date, day_start_time, number_of_slots_in_a_day, meeting_requests) {

    /**
     * 1. Initially, it will create an empty array with number of slots available for the day.
     * 2. Each slot weight is 30mins -If the meeting needs 1hr, then number of slots needed is 2 (ie.,30min * 2 = 1hr).
     */
    var slots_in_a_day = new Array(number_of_slots_in_a_day);

    for (let j = 0; j < meeting_requests.length; j++) {
        // Get only list of meetings available for the specific date.
        if (meeting_date === meeting_requests[j].meeting_slot.split(' ')[0]) {

            // Number of slots needed = meeting duration * 2
            var slots_needed = meeting_requests[j].duration * 2;
            // Loop through the day to check if there are slot available for the meeting
            for (let k = 0; k < slots_in_a_day.length - slots_needed; k++) {

                // Check whether there is a consecutive slot available for the meeting from the specified index. Here "k" is a meeting slot's starting index. Also, this area set the meeting in a chronological order. So, don't have to order the slot later.
                if (isSlotAvailable(slots_in_a_day, slots_needed, k)) {
                    // If there is a slot available, then get the meeting slot index and fill the empty array, which represented by "slots_in_a_day".
                    var meeting_at = getMeetingIndex(day_start_time, meeting_requests[j].meeting_slot.split(' ')[1]);
                    for (let l = 0; l < slots_needed; l++) {
                        // Only write the data to an array when the index is empty.
                        if (slots_in_a_day[meeting_at] === undefined) {
                            slots_in_a_day[meeting_at] = meeting_requests[j];
                            meeting_at++;
                        }
                    }
                }
            }
        }
    }
    return slots_in_a_day;
}
module.exports = fillArrayWithTimeSlots;