const service = require('./teacher.service');

service
    .create({name: "dela"})
    .then(dela => service.get(dela._id))
    .then(dela => service.addAvailability(dela._id, {day: 'monday', from: new Date(), to: new Date()}))
    .then(console.log, console.log);

service
    .all()
    .then(console.log, console.log);