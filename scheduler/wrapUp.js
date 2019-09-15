function wrapUp(day_start_time, day_end_time, slots_in_a_day) {

    var finalized_schedule = [];
    // Wrap up the mesh and organize the schedule
    for (let j = 0; j < slots_in_a_day.length; j++) {
        // Only get the slots assigned in a day. If the values of an array is "undefined", then skip the index with if statement.
        if (slots_in_a_day[j] != undefined) {
            // Set meeting start time
            var meeting_start_time = new Date(slots_in_a_day[j].meeting_slot);
            // Set meeting end time
            var meeting_end_time = new Date(slots_in_a_day[j].meeting_slot);
            meeting_end_time.setHours(meeting_end_time.getHours() + parseInt(slots_in_a_day[j].duration, 10));

            // Get office start and end time
            var start = new Date(slots_in_a_day[j].meeting_slot.split(' ')[0] + " " + day_start_time);
            var end = new Date(slots_in_a_day[j].meeting_slot.split(' ')[0] + " " + day_end_time);

            // Check the meeting only fall inside office hours. And push to the "finalized_schedule" array.
            if ((start.getTime() <= meeting_start_time.getTime()) && (meeting_end_time.getTime() <= end.getTime())) {
                finalized_schedule.push(slots_in_a_day[j].meeting_slot.split(' ')[1] + " " + meeting_end_time.getHours() + ":" + (meeting_end_time.getMinutes() < 10 ? '0' : '') + meeting_end_time.getMinutes() + " " + slots_in_a_day[j].emp_name);
            }
        }
    }

    // Remove the repeated slots and get the unique meeting slots from an array.
    var sortedSchedules = [...new Set(finalized_schedule.map(schedule => schedule))]

    return sortedSchedules;
}

module.exports = wrapUp;