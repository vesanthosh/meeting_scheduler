const scheduler = require('../scheduler/scheduler');

describe('get input and get output', () => {
    test('', () => {

        var input = "0900 1730\n\n2011-03-17 10:17:06 EMP001\n\n2011-03-21 09:00 2\n\n2011-03-16 12:34:56 EMP002\n\n2011-03-21 09:00 2\n\n2011-03-16 09:28:23 EMP003\n\n2011-03-22 14:00 2\n\n2011-03-17 11:23:45 EMP004\n\n2011-03-22 16:00 1\n\n2011-03-15 17:29:12 EMP005\n\n2011-03-21 16:00 3\n";

        var expected_output =
            [
                { date: '2011-03-21', schedule: ['09:00 11:00 EMP002'] },
                {
                    date: '2011-03-22',
                    schedule: ['14:00 16:00 EMP003', '16:00 17:00 EMP004']
                }
            ];
        expect(scheduler(input)).toEqual(expected_output);
    });
});
