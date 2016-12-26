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
- validate if teacher availability is valid (e.g. 'to' must be earlier than 'from')
- write integration tests
- rethink naming: 'maybe the "teacher" dir should be named "schedule"'
- add capability to handle more than one static week.
- minify files
- add error scenarios (e.g. user was not found)
- add logging / monitoring
