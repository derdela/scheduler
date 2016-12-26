angular.module('student')
    .component('studentSchedule', {
        templateUrl: 'app/student/schedule.html',
        controller: ['teacherService', function (teacherService) {

            teacherService.all()
                .then(teachers => this.teachers = teachers)
            this.days = ['monday', 'thuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']


            this.onSlotClick = function (teacherId, day, slot) {
                teacherService.blockSlot(teacherId, 1, day, slot);
            };
        }]
    });