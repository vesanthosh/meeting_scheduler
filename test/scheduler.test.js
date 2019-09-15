const scheduler = require('../scheduler/scheduler');

describe('Meeting Scheduler with following test case', () => {
    test('Meeting should not be scheduled outside of office hours.', () => {

        var input = "0900 1730\n\n2011-03-17 10:17:06 EMP001\n\n2011-03-21 07:30 2\n\n2011-03-15 17:29:12 EMP002\n\n2011-03-22 16:00 3\n";

        // All meetings can be scheduled only outside of an office hours as per input. So, nothing is scheduled and array will be empty.
        var expected_output = [];
        expect(scheduler(input)).toEqual(expected_output);
    });

    test('Meeting should not be overlap with the already scheduled meeting slot.', () => {

        var input = "0800 1630\n\n2011-03-17 11:23:45 EMP002\n\n2011-03-21 10:00 1\n\n2011-03-16 10:17:06 EMP001\n\n2011-03-21 09:00 2\n";

        var expected_output = [
            {
                date: '2011-03-21',
                schedule: [
                    '09:00 11:00 EMP001'
                ]
            }
        ];
        expect(scheduler(input)).toEqual(expected_output);
    });

    test('All the booking requests should be processed in chronological order.', () => {

        var input = "0900 1730\n\n2011-03-17 10:17:06 EMP001\n\n2011-03-21 11:00 2\n\n2011-03-15 12:34:56 EMP002\n\n2011-03-21 09:00 2\n\n2011-03-17 09:28:23 EMP003\n\n2011-03-21 14:00 2";

        var expected_output = [
            {
                date: '2011-03-21',
                schedule: [
                    '09:00 11:00 EMP002',
                    '11:00 13:00 EMP001',
                    '14:00 16:00 EMP003'
                ]
            }
        ];
        expect(scheduler(input)).toEqual(expected_output);
    });

    test('All constraints and logics together.', () => {

        var input = "0900 1730\n\n2011-03-17 10:17:06 EMP001\n\n2011-03-21 09:00 2\n\n2011-03-16 12:34:56 EMP002\n\n2011-03-21 09:00 2\n\n2011-03-16 09:28:23 EMP003\n\n2011-03-22 14:00 2\n\n2011-03-17 11:23:45 EMP004\n\n2011-03-22 16:00 1\n\n2011-03-15 17:29:12 EMP005\n\n2011-03-21 16:00 3\n";

        var expected_output = [
            {
                date: '2011-03-21',
                schedule: [
                    '09:00 11:00 EMP002'
                ]
            },
            {
                date: '2011-03-22',
                schedule: [
                    '14:00 16:00 EMP003',
                    '16:00 17:00 EMP004'
                ]
            }
        ];
        expect(scheduler(input)).toEqual(expected_output);
    });
});
