const fs = require('fs');

const scheduler = require('./scheduler/scheduler');

try {
    // Read the file from the command line when executing file. (Ex. node programfile.js input.txt)
    var input = fs.readFileSync(process.argv[2]).toString();
    var scheduled_meeting = scheduler(input);

    // Loop through each date and print scheduled meeting on that date in order.
    for (let i = 0; i < scheduled_meeting.length; i++) {
        console.log(scheduled_meeting[i].date + "\n");
        for (let j = 0; j < scheduled_meeting[i].schedule.length; j++) {
            console.log(scheduled_meeting[i].schedule[j] + "\n");
        }
    }

} catch (err) {
    console.log(err);
    console.log("Usage: node <program_file.js> <input_file_path>");
}
