import { expect } from 'chai';
import request from 'supertest';
import MongoConnection from '../persistence/mongo/config/mongoConnection.config.js';
import Config from '../config/config.js';



const URL = `http://localhost:${Config.SERVER_PORT}`;

const credentials = {
  email: Config.TEST_EMAIL,
  password: Config.TEST_PASSWORD
};


describe('Cart router', () => {
  before(() => {
    MongoConnection.connect();
  });

  describe('GET /api/carts', () => {
    it('should return a list of cats ids', (done) => {
      // Login first to get the session cookie
      request(URL)
        .get('/api/carts')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).has.property('status');
          expect(res.body.status).to.equal('success');
          expect(res.body).has.property('payload');
          expect(res.body.payload).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /api/carts', () => {
    it('should return the created cart as void array', (done) => {
      // Login first to get the session cookie
      request(URL)
        .post('/api/carts')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).has.property('status');
          expect(res.body.status).to.equal('success');
          expect(res.body).has.property('payload');
          expect(res.body.payload).to.be.an('object');
          expect(res.body.payload).has.property('id');
          expect(res.body.payload).has.property('products');
          expect(res.body.payload.products).to.be.an('array');
          expect(res.body.payload.products).to.be.empty;
          done();
        });
    });
  })

  describe('GET /api/carts/:cid', () => {
    it('should return the cart with the given id', (done) => {
      // Login first to get the session cookie
      request(URL)
        .get('/api/carts/644a006880dd54668a5ab933')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          expect(res.body).to.be.not.empty;
          expect(res.body[0]).to.be.an('object');
          expect(res.body[0]).has.property('product');
          expect(res.body[0]).has.property('quantity');
          expect(res.body[0].product).has.property('id');
          expect(res.body[0].product).has.property('title');
          expect(res.body[0].product).has.property('description');
          expect(res.body[0].product).has.property('price');
          expect(res.body[0].product).has.property('stock');
          expect(res.body[0].product).has.property('category');
          expect(res.body[0].product).has.property('code');
          expect(res.body[0].product).has.property('thumbnails');

          done();
        });
    })
  })

  describe('POST /api/carts/:cid/product/:pid', () => {
    it('should return the cart with the given id', (done) => {

      const cid = '644a006880dd54668a5ab933'
      const pid = '63f2b1c16dbbb43354b8aba3'
      // Login first to get the session cookie
      request(URL)
        .post('/api/sessions/login')
        .send(credentials)
        .expect(200)
        .end((err, res) => {

          request(URL)
            .post(`/api/carts/${cid}/product/${pid}`)
            .set('Cookie', res.headers['set-cookie'])
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.be.an('object');
              expect(res.body).has.property('status');
              expect(res.body.status).to.equal('success');
              expect(res.body).has.property('message');
              expect(res.body.message).to.equal(`Product: ${pid} added to cart: ${cid}`);

              request(URL)
                .get(`/api/carts/${cid}`)
                .expect(200)
                .end((err, res) => {
                  if (err) return done(err);
                  expect(res.body).to.be.an('array');
                  expect(res.body).to.be.not.empty;

                  done();
                });
            });
        });
    })
  })

})