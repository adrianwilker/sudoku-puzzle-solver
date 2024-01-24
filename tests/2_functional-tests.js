const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .set('content-type', 'application/json')
      .send({
        puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.solution, '568913724342687519197254386685479231219538467734162895926345178473891652851726943')
      })
    done()
  })

  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .set('content-type', 'application/json')
      .send({
        puzzle: ''
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.include(res.body.error, 'Required field missing')
      })
    done()
  })

  test('Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .set('content-type', 'application/json')
      .send({
        puzzle: '5#.91372.3...8.5.9.9.25@.8.68.47.23.&.95..46.7.4..,..5.2.....$.4..8916..85.72.a.3'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.include(res.body.error, 'Invalid characters in puzzle')
      })
    done()
  })

  test('Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .set('content-type', 'application/json')
      .send({
        puzzle: '5..91372.3...8.5.9.9.25..8.68.47.23...95..3'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.include(res.body.error, 'Expected puzzle to be 81 characters long')
      })
    done()
  })

  test('Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .set('content-type', 'application/json')
      .send({
        puzzle: '1.....1....1...............1..........1...............1.............1...........1'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Puzzle cannot be solved')
      })
    done()
  })

  test('Check a puzzle placement with all fields: POST request to /api/check', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .set('content-type', 'application/json')
      .send({
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'E5',
        value: '8'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.isTrue(res.body.valid)
      })
    done()
  })

  test('Check a puzzle placement with single placement conflict: POST request to /api/check', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .set('content-type', 'application/json')
      .send({
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'G7',
        value: '6'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.isFalse(res.body.valid)
        assert.isArray(res.body.conflict)
        assert.equal(res.body.conflict.length, 1)
      })
    done()
  })

  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .set('content-type', 'application/json')
      .send({
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'A3',
        value: '9'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.isFalse(res.body.valid)
        assert.isArray(res.body.conflict)
        assert.equal(res.body.conflict.length, 2)
      })
    done()
  })

  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .set('content-type', 'application/json')
      .send({
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'B6',
        value: '1'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.isFalse(res.body.valid)
        assert.isArray(res.body.conflict)
        assert.equal(res.body.conflict.length, 3)
      })
    done()
  })

  test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .set('content-type', 'application/json')
      .send({
        puzzle: '',
        coordinate: 'B6',
        value: ''
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Required field(s) missing')
      })
    done()
  })

  test('Check a puzzle placement with invalid characters: POST request to /api/check', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .set('content-type', 'application/json')
      .send({
        puzzle: '82..4..6...16..89a..98315.749.157+.......%....53..4...96.415..81..7632..3...28.51',
        coordinate: 'A1',
        value: '7'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Invalid characters in puzzle')
      })
    done()
  })

  test('Check a puzzle placement with incorrect length: POST request to /api/check', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .set('content-type', 'application/json')
      .send({
        puzzle: '53..4...96.415..8.........3...28.51',
        coordinate: 'A1',
        value: '7'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
      })
    done()
  })

  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .set('content-type', 'application/json')
      .send({
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'J1',
        value: '3'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Invalid coordinate')
      })
    done()
  })

  test('Check a puzzle placement with invalid placement value: POST request to /api/check', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .set('content-type', 'application/json')
      .send({
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'H6',
        value: '10'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Invalid value')
      })
    done()
  })

});