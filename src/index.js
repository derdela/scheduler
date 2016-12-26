const
    mongoose = require('mongoose'),
    app = require('koa')(),
    serve = require('koa-static'),
    bodyParser = require('koa-body')(),
    health = require('koa-ping'),
    router = require('koa-router')();

const
    teacher = require('./teacher');

mongoose.connect('mongodb://localhost/schedule');
mongoose.Promise = Promise;

router.get('/api/teachers/', function*() {
    this.body = yield teacher.service.all();
});

router.post('/api/teachers/', function*() {
    teacher.service.create(this.request.body);
});

router.get('/api/teachers/:id', function*() {
    this.body = yield teacher.service.get(this.params.id);
});

router.post('/api/teachers/:id/availability', bodyParser, function*() {
    this.body = yield teacher.service.addAvailability(this.params.id, this.request.body);
});

router.put('/api/teachers/:id/slots', bodyParser, function*() {
    this.body = yield teacher.service.blockSlot(this.params.id, this.request.body);
});

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve('public'))
    .use(health());

app.listen(5000);