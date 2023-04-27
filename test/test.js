const assert = require('chai').assert;
const request = require('supertest')
const { getSchedule, getLineSchedule, compareTime, convert12To24, isValidTime } = require('../controllers/scheduleController');
const app = require('../index');

//UNIT TESTS
describe('Time Operations', () => {

    it('should check if time is valid', () => {
        assert.equal(isValidTime('12:00pm'), true);
        assert.equal(isValidTime('12:00am'), true);
        assert.equal(isValidTime('11:59pm'), true);
        assert.equal(isValidTime('1200'), true);
        assert.equal(isValidTime('0000'), true);
        assert.equal(isValidTime('001'), true);
        assert.equal(isValidTime('2359'), true);

        assert.equal(isValidTime('12:00'), false);
        assert.equal(isValidTime('12:00p'), false);
        assert.equal(isValidTime('12 pm '), false);
        assert.equal(isValidTime('12:00amc '), false);
        assert.equal(isValidTime('12:00pm '), false);
        assert.equal(isValidTime('2500'), false);
        assert.equal(isValidTime('::::pm'), false);
        assert.equal(isValidTime('****pm'), false);
        assert.equal(isValidTime('****'), false);

    });

    it('should convert 12 hour time to 24 hour', () => {
        assert.equal(convert12To24('12:00pm'), 1200);
        assert.equal(convert12To24('12:00am'), 00);
        assert.equal(convert12To24('11:59pm'), 2359);
        assert.equal(convert12To24('06:30am'), 630);
    });

    it('should compare time in different formats', () => {
        assert.equal(compareTime(1200, '12:00pm'), true);
        assert.equal(compareTime(1200, '12:00am'), false);
    });

});

//INTEGRATION TESTS
describe('GET /schedule', () => {
    it('should return the entire timetable', (done) => {
        request(app)
          .get('/schedule')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            assert.isArray(res.body);
            done();
        });
    });
});

describe('GET /schedule/{line}', () => {
    it('should return timetable for valid line', (done) => {
        request(app)
          .get('/schedule/Lakeshore')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            assert.isArray(res.body);
            done();
        });
    });

    it('should return 404 for invalid line', (done) => {
        request(app)
          .get('/schedule/invalid')
          .expect(404)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Not Found');
            done();
        });
    });
});

describe('GET /schedule/{line}?departure={time}', () => {
    it('should return one-element JSON array for valid line and matching departure time in 24-hour format', (done) => {
        request(app)
          .get('/schedule/Kitchener?departure=1215')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            assert.isArray(res.body);
            assert.equal(res.body.length, 1);
            done();
        });
    });

    it('should return one-element JSON array for valid line and matching departure time in 12-hour format', (done) => {
        request(app)
          .get('/schedule/Kitchener?departure=12:15pm')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            assert.isArray(res.body);
            assert.equal(res.body.length, 1);
            done();
        });
    });

    it('should return empty JSON array for valid line and non-matching departure time', (done) => {
        request(app)
          .get('/schedule/Kitchener?departure=12:00pm')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            assert.isArray(res.body);
            assert.equal(res.body.length, 0);
            done();
        });
    });

    it('should return 404 for invalid line', (done) => {
        request(app)
          .get('/schedule/invalid?departure=12:15pm')
          .expect(404)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Not Found');
            done();
        });
    });

    it('should return 400 for invalid departure time', (done) => {
        request(app)
          .get('/schedule/Kitchener?departure=6am')
          .expect(400)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Bad Request');
            done();
        });
    });
    
});

describe('Invalid Routes', () => {
    it('should return 404 for invalid route', (done) => {
        request(app)
          .get('/invalid')
          .expect(404)
          .end((err, res) => {
            done();
          });
    });
});
