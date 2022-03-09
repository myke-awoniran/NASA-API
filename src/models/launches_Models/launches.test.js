const app = require('../../../App');
const request = require('supertest')(app);
describe('TEST GET /launches', () => {
  test('It should respond with 200 success', async () => {
    const response = await request.get('/launches').expect(200);
  });
});

describe('TEST POST /launch', () => {
  test('It should respond with 201 created,', async () => {
    const response = await request
      .post('/launches')
      .send({
        mission: 'Kepler Exploration X',
        rocket: 'Explorer IS1',
        launchDate: 'January 4,2028',
        target: 'Kepler-1652 b',
      })
      .expect('Content-Type', /json/);
  });
  test('It should catch missing required properties', () => {});
  test('It should catch invalid dates', () => {});
});
