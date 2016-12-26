const {Teacher} = require('./teacher.model');

function all() {
    return Teacher.find({})
        .lean()
        .then(teachers => teachers.map(teacher => {
            teacher.slots = splitIntoSlots(teacher.availabilty);
            teacher.slots = mergeBlockedSlots(teacher);
            return teacher;
        }));
}

function get(id) {
    return Teacher.findById(id)
        .then(teacher => {
            teacher.slots = splitIntoSlots(teacher.availabilty);
            teacher.slots = mergeBlockedSlots(teacher);
            return teacher;
        });
}

function create(teacher) {
    teacher = new Teacher(teacher);
    return teacher.save();
}

function addAvailability(teacherId, availabilty) {
    return get(teacherId)
        .then(teacher => {
            teacher.availabilty.push(availabilty);
            return teacher;
        })
        .then(teacher => teacher.save());
}

function blockSlot(teacherId, booking) {
    return get(teacherId)
        .then(teacher => {
            teacher.bookings.push({
                studentId: booking.studentId,
                from: booking.from,
                to: booking.to,
                day: booking.day
            });
            return teacher.save();
        });
}

function mergeBlockedSlots(teacher) {
    return teacher.bookings.reduce((slots, booking) => {
        const day = slots[booking.day];
        if (day) {
            const matchingSlots = day.filter(slot => slot.from.getTime() === booking.from.getTime())
            matchingSlots.forEach(slot => {
                slot.available = false;
            });
        }
        return slots;
    }, teacher.slots);
}

function splitIntoSlots(availabilty) {
    return availabilty.reduce((slots, availabilty) => {
        slots[availabilty.day] = slots[availabilty.day] || [];
        let from = new Date(availabilty.from);
        const to = new Date(availabilty.to);

        while (from.getTime() < to.getTime()) {
            const slot = calculateSlot(from);
            slots[availabilty.day].push(slot);
            from = slot.to;
        }
        return slots;
    }, {});
}

function calculateSlot(from) {
    from = new Date(from);
    const to = new Date(new Date(from).setMinutes(from.getMinutes() + 30));
    return {
        from: from,
        to: to,
        available: true
    }
}

module.exports = {get, create, addAvailability, all, blockSlot}