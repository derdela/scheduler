# Scheduler

## run locally ##
```
npm install
npm start
```

also a mongodb must be available at localhost:27017

## TODO
- handle multiple students and multiple teachers. (both IDs are hardcoded)
- validate on server side if slot is available
- validate if teacher availabilty is valid (e.g. 'to' must be earlyer than 'from')
- write integration tests
- rethink naming: 'maybe the "teacher" dir should be named "schedule"'
- add capability to handle more than one static week.
