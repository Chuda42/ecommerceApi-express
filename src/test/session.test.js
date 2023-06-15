import { expect } from 'chai';
import request from 'supertest';
import MongoConnection from '../persistence/mongo/config/mongoConnection.config.js';
import Config from '../config/config.js';
import { v4 as uuidv4 } from 'uuid';



const URL = `http://localhost:${Config.SERVER_PORT}`;

const credentials = {
  email: Config.TEST_EMAIL,
  password: Config.TEST_PASSWORD
};

const adminCredentials = {
  email: Config.ADMIN_EMAIL,
  password: Config.ADMIN_PASSWORD
};


describe('Session router', () => {
  before(() => {
    MongoConnection.connect();
  });

  describe('GET /api/sessions/failregister', () => {
    it('failregister', (done) => {
      request(URL)
        .get('/api/sessions/failregister')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error).to.be.equal('Error registering user');
          done();
        })
    });
  })

  describe('POST /api/sessions/register', () => {
    it('register ok and login', (done) => {

      const email = `${uuidv4()}@`;
      const pass = 'pass'
      const newCredentials = {
        first_name: 'test',
        last_name: 'test',
        age: 18,
        email: email,
        password: pass
      };

      request(URL)
        .post('/api/sessions/register')
        .send(newCredentials)
        .end((err, res) => {
          if (err) return done(err);

          request(URL)
            .post('/api/sessions/login')
            .send(newCredentials)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              const sessionCookie = res.headers['set-cookie'][0].split(';')[0];

              request(URL)
                .get('/api/sessions/current')
                .set('Cookie', sessionCookie)
                .expect(200)
                .end((err, res) => {
                  if (err) return done(err);
                  expect(res.body.status).to.be.equal('success');
                  expect(res.body.payload.email).to.be.equal(newCredentials.email);
                  expect(res.body.payload.first_name).to.be.equal(newCredentials.first_name);
                  expect(res.body.payload.last_name).to.be.equal(newCredentials.last_name);
                  expect(res.body.payload.age).to.be.equal(newCredentials.age);
                  expect(res.body.payload.role).to.be.equal('user');

                  done();
                })
            })
        })
    });

    it('register fail, user with email already exist', (done) => {
      const email = `${uuidv4()}@`;
      const pass = 'pass'
      const newCredentials = {
        first_name: 'test',
        last_name: 'test',
        age: 18,
        email: email,
        password: pass
      };

      request(URL)
        .post('/api/sessions/register')
        .send(newCredentials)
        .end((err, res) => {
          if (err) return done(err);

          request(URL)
            .post('/api/sessions/register')
            .send(newCredentials)
            .expect(302, done)
        })
    });

    it('register fail, email admin is not allowed', (done) => {
      request(URL)
        .post('/api/sessions/register')
        .send(adminCredentials)
        .expect(302, done)
    });

  })

})