// Let's bring up some needed functions
const getMeetingIndex = require('./getMeetingIndex');
const fillArrayWithTimeSlots = require('./fillArrayWithTimeSlots');
const wrapUp = require('./wrapUp');

function scheduler(input_file_content) {

    // Set the inital values for office start and end time
    var day_start_time = '';
    var day_end_time = '';
    var number_of_slots_in_a_day = 0;

    // array for storing structured meeting time slots and sorted meeting dates
    var meeting_requests = [];

    // Complete array which holds perfect results
    var finalized_meeting_schedules = [];

    // Lets initialize and structure some stuffs
    // Read and split the "\n" from input
    var input = input_file_content.split("\n");

    // Read and format start time and end time of an office and create number of slots in a day.
    day_start_time = input[0].split(' ')[0];
    day_start_time = day_start_time[0] + day_start_time[1] + ":" + day_start_time[2] + day_start_time[3];
    day_end_time = input[0].split(' ')[1];
    day_end_time = day_end_time[0] + day_end_time[1] + ":" + day_end_time[2] + day_end_time[3];

    number_of_slots_in_a_day = getMeetingIndex(day_start_time, day_end_time);

    // Get list of meetings requested by the users and structure it for easy manipulation.
    for (let i = 2; i < input.length; i++) {
        var meeting_details = input[i + 2].split(' ');
        var request = {
            emp_name: input[i].split(' ')[2],
            request_time: input[i].split(' ')[0] + " " + input[i].split(' ')[1],
            meeting_slot: meeting_details[0] + " " + meeting_details[1],
            duration: meeting_details[2]
        }
        meeting_requests.push(request);
        i = i + 3;
    }

    // Get meeting slots and sort date in chronological order in the beginning itself to avoid further program load.
    var sorted_meeting_date = [...new Set(meeting_requests.map(schedules => schedules.meeting_slot.split(' ')[0]))].sort(function (x, y) {
        if (x > y)
            return 1;
        if (x < y)
            return -1;
        return 0;
    });


    meeting_requests.sort(function (x, y) {
        // It would be better to sort the user requests based on their request time and make an array to sort the "meeting_requests".
        var sorted_request_time = [...new Set(meeting_requests.map(schedules => schedules.request_time))].sort(function (x, y) {
            if (x > y)
                return 1;
            if (x < y)
                return -1;
            return 0;
        });

        return sorted_request_time.indexOf(x.request_time) - sorted_request_time.indexOf(y.request_time);
    });

    /**
     * Main Logic Starts here:
     * 1. Initially, it will create an empty array with number of slots available for the day.
     * 2. Each slot weight is 30mins -If the meeting needs 1hr, then number of slots needed is 2 (ie.,30min * 2 = 1hr).
     */
    for (let i = 0; i < sorted_meeting_date.length; i++) {

        // Initialze empty arrays to store results
        var scheduled_slots_in_a_day = fillArrayWithTimeSlots(sorted_meeting_date[i], day_start_time, number_of_slots_in_a_day, meeting_requests)

        // Pass "scheduled_slots_in_a_day" to the wrap up function which clears the empty slots in a day, check whether the meeting is within the office hours and structure the results
        const schedules = wrapUp(day_start_time, day_end_time, scheduled_slots_in_a_day);
        if (schedules.length > 0) {
        finalized_meeting_schedules.push({
            date: sorted_meeting_date[i],
            schedule: schedules
        });
    }
    }
    // return json like format meeting schedules
    return finalized_meeting_schedules;
}

module.exports = scheduler;