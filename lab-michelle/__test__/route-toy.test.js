//For the record, I know these tests don't work because I haven't had time to get to them really, but I at least wrote one to sort of show that I can scaffold out some sort of test. I did check to see if the method works in MongoDB. Also - just wondering why we have to have tests in this one if we know that stuff is posting properly in mongo?

'use strict';
const superagent = require('superagent');
const server = require('../lib/server');
const Promise = require('bluebird');
//we don't have a direct link to any storage in here, which feels like maybe there should be??
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
require('jest');

describe('Testing routes', function() {
  afterAll(done => server.close(done));
  describe('requests to /api/toy', () => {
    describe('POST requests', () => {
      describe('Valid requests', ()=> {
        beforeAll(done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({
              name: 'totoro',
              desc: 'fuzzy bear-type dealybob',
            })
            .then(res => {
              this.mockToy = res.body;
              this.resPost = res;
              done();
            });
        });
        test('should create a toy in db(toy-dev) w/collection of toys', () => {
          expect(this.mockToy.name).toBe('totoro');
          //how will we know that it went in the mongo database specifically though? Just through the code we required in? It seems like we should be specifying somewhere where this mocktoy.name will actually be??
        });
      });
    });
    describe('Invalid requests', () => {

    });
  });
});
