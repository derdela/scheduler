angular.module('teacher')
    .service('teacherService', ['$http', function ($http) {
        const api = '/api/';
        this.all = all;
        this.getSchedule = getSchedule;
        this.addAvailability = addAvailability;
        this.blockSlot = blockSlot;

        function all() {
            return $http
                .get(api + 'teachers/')
                .then(res => res.data)
                .then(teachers => teachers.map(teacher => {
                    teacher.availabilty = groupByDays(teacher);
                    return teacher;
                }));
        }

        function getSchedule() {
            return $http
                .get(api +'teachers/5860fa2bb829a6ac3cea12ed')
                .then(res => res.data)
                .then(teacher => {
                    const schedule = groupByDays(teacher);
                    return schedule;
                });
        }

        function addAvailability(slot) {
            return $http
                .post(api + 'teachers/5860fa2bb829a6ac3cea12ed/availability', slot)
                .then(res => res.body);
        }

        function blockSlot(teacherId, studentId, day, slot) {
            return $http
                .put(`${api}/api/teachers/${teacherId}/slots`, {
                    day: day,
                    from: slot.from,
                    to: slot.to,
                    studentId: studentId
                })
                .then(res => res.body);
        }

        function groupByDays(teacher) {
            return teacher.availabilty.reduce((days, availability) => {
                days[availability.day] = days[availability.day] || [];
                days[availability.day].push(availability);
                return days;
            }, {});
        }
    }])