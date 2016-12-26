angular.module('teacher')
    .component('teacherSchedule', {
        templateUrl: 'app/teacher/schedule.html',
        controller: ['teacherService', function (teacherService) {
            const fetchSchedule = () => teacherService.getSchedule().then(schedule => this.schedule = schedule);

            fetchSchedule();
            this.days = ['monday', 'thuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

            this.onAddAvailability = function () {
                teacherService.addAvailability(this.form)
                    .then(fetchSchedule);
            };
        }]
    });