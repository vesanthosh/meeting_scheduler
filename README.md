# Meeting Scheduler

## Installation

1. Make sure you have Git installed on your computer and clone the repository and navigate into the folder.
```bash
> git clone https://github.com/vesanthosh/meeting_scheduler.git
> cd meeting_scheduler/
```
2. Install packages with npm package manager.

```npm
> npm install
```

### Input format
The input file is a `./meeting_input.txt` which contains the following inputs. The text file is having the start time and end time of office hours and followed by list of user requests to schedule the upcoming meetings. And each line is separated by `\n\n`, which is a newline.

```bash
0900 1730

2011-03-17 10:17:06 EMP001

2011-03-21 09:00 2

2011-03-16 12:34:56 EMP002

2011-03-21 09:00 2

2011-03-16 09:28:23 EMP003

2011-03-22 14:00 2

2011-03-17 11:23:45 EMP004

2011-03-22 16:00 1

2011-03-15 17:29:12 EMP005

2011-03-21 16:00 3

```
## Usage
### Running a Scheduler
To run the program, execute the following line on the terminal.
```npm
> npm start
```
The scheduler program will process the input file `./meeting_input.txt` and provides the following as an output, which is fulfilling the requirements and the logics of the scheduler.

```bash
2011-03-21

09:00 11:00 EMP002

2011-03-22

14:00 16:00 EMP003

16:00 17:00 EMP004

```
### Running a Test
To run the test for the scheduler, execute the following line on the terminal. It is using `jest` framework to perform testing on javascript.
```npm
> npm test
```
Probably the test results will look similar to this.
```npm
> meeting_scheduler@1.0.0 test location_to_your_repo/meeting_scheduler
> jest

 PASS  test/scheduler.test.js
   Meeting Scheduler with the following test case
    ✓ Meeting should not be scheduled outside of office hours. (3ms)
    ✓ Meeting should not be overlap with the already scheduled meeting slot.
    ✓ All the booking requests should be processed in chronological order. (1ms)
    ✓ All constraints and logics together.

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.562s, estimated 1s
Ran all test suites.
```