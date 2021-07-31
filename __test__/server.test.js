import 'regenerator-runtime/runtime'


const app = require('../src/server/server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)


describe('Testing / response', () => {
    test('Obtain 200 server response from call', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    })
})