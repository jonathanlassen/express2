const app = require('../app')
const chai = require('chai')
const expect = chai.expect
chai.use(require("chai-sorted"))
const request = require('supertest')


describe('GET /apps basic endpoint', () => {
    it('should return exactly 20 elements within an array', () => {
      return request(app)
        .get('/apps') // invoke the endpoint
        .expect(200)  //assert that you get a 200 OK status
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array'); // make sure you get an array
          expect(res.body).to.have.lengthOf.at.least(1); // array must not be empty
          expect(res.body).to.have.length(20); // make sure that exactly 20 elements are returned   
        });
    })
  });

describe('GET /apps?genre=Action filtering by genre', () => {
    it('should correctly return only genre items requested', () => {
        const query = {
            genres: 'Action',
          };
      return request(app)
        .get('/apps') // invoke the endpoint
        .query(query)
        .expect(200)  //assert that you get a 200 OK status
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array'); // make sure you get an array
          expect(res.body).to.have.lengthOf.at.least(1); // array must not be empty
          expect(res.body).to.have.length(5); // make sure that exactly 20 elements are returned   
        });
    })
  });

  describe('GET /apps?genre=Action?sort=rating sorting by rating or title', () => {
    it('should correctly sort items when requested', () => {
        const query = {
            genres: 'Action',
            sort: 'rating'
          };
      return request(app)
        .get('/apps') // invoke the endpoint
        .query(query)
        .expect(200)  //assert that you get a 200 OK status
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array'); // make sure you get an array
          expect(res.body).to.have.lengthOf.at.least(1); // array must not be empty
          expect(res.body).to.have.length(5); // make sure that exactly 5 elements are returned   
          expect(res.body).to.be.sorted(); // make sure that the items are sorted   
        });
    })
  });

  describe('GET /apps?genre=wronggenre inputting wrong genre names', () => {
    it('should return 400 when given wrong genre input', () => {
        const query = {
            genres: 'wronggenre'
          };
      return request(app)
        .get('/apps') // invoke the endpoint
        .query(query)
        .expect(400)  //assert that you get a 400  status
    })
  });

  describe('GET /apps?genre=Action&sort=wrongsort inputting wrong sort attribute', () => {
    it('should return 400 when given wrong sort input', () => {
        const query = {
            genres: 'Action',
            sort: 'wrongsort'
          };
      return request(app)
        .get('/apps') // invoke the endpoint
        .query(query)
        .expect(400)  //assert that you get a 400  status
    })
  });