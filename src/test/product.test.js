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


describe('Product router', () => {
  before(() => {
    MongoConnection.connect();
  });
  describe('GET /api/products', () => {
    it('should return a list of products', (done) => {
      // Login first to get the session cookie
      request(URL)
        .post('/api/sessions/login')
        .send(credentials)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
          // Get the list of products
          request(URL)
            .get('/api/products')
            .set('Cookie', sessionCookie)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.be.an('object');
              expect(res.body).has.property('status');
              expect(res.body.status).to.equal('success');
              expect(res.body).has.property('payload');
              expect(res.body.payload).to.be.an('array');
              expect(res.body).has.property('totalPages');
              expect(res.body).has.property('prevPage');
              expect(res.body).has.property('nextPage');
              expect(res.body).has.property('page');
              expect(res.body).has.property('hasPrevPage');
              expect(res.body).has.property('hasNextPage');
              done();
            });
        });
    });
  });

  describe('POST /api/products', () => {
    it('should add a new product', (done) => {
      // Login first to get the session cookie
      const code = uuidv4();
      const product = {
        "title": "ootro1",
        "description": "3",
        "price": 8,
        "code": code,
        "thumbnails": ["hola"],
        "status": false,
        "stock": 25,
        "category": "23"
      }

      request(URL)
        .post('/api/sessions/login')
        .send(credentials)
        .expect(200)
        .end((err, res) => {
          const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
          // Add a new product
          request(URL)
            .post('/api/products')
            .set('Cookie', sessionCookie)
            .send(product)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.be.an('object');
              expect(res.body).has.property('status');
              expect(res.body.status).to.equal('ok');
              expect(res.body).has.property('message');
              expect(res.body.message).to.equal('Added product');
              expect(res.body).has.property('payload');
              expect(res.body.payload).to.be.an('object');
              expect(res.body.payload).has.property('title');
              expect(res.body.payload.title).to.equal(product.title);
              expect(res.body.payload).has.property('description');
              expect(res.body.payload.description).to.equal(product.description);
              expect(res.body.payload).has.property('price');
              expect(res.body.payload.price).to.equal(product.price);
              expect(res.body.payload).has.property('code');
              expect(res.body.payload.code).to.equal(product.code);
              expect(res.body.payload).has.property('thumbnails');
              expect(res.body.payload.thumbnails).to.be.an('array');
              expect(res.body.payload).has.property('status');
              expect(res.body.payload.status).to.equal(product.status);
              expect(res.body.payload).has.property('stock');
              expect(res.body.payload.stock).to.equal(product.stock);
              expect(res.body.payload).has.property('category');
              expect(res.body.payload.category).to.equal(product.category);
              done();
            });
        });
      })

      it('should return an error if the product with code already exists', (done) => {
        const product = {
          "title": "Harry Potter y la camara secreta",
          "description": "Libro 2 de la saga de Harry Potter",
          "price": 900,
          "code": "hp2",
          "stock": 25,
          "category": "adventure",
          "status": false,
          "thumbnails": []
        }

        // Login first to get the session cookie
        request(URL)
          .post('/api/sessions/login')
          .send(credentials)
          .expect(200)
          .end((err, res) => {
            const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
            // Add a new product
            request(URL)
              .post('/api/products')
              .set('Cookie', sessionCookie)
              .send(product)
              .expect(400)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).has.property('status');
                expect(res.body.status).to.equal('error');
                expect(res.body).has.property('error');
                expect(res.body.error).to.equal('Product creation error');
                done();
              });
          }
        );
      })
  });

  describe('GET /api/products/:pid', () => {
    it('should return a product by id', (done) => {
      // Login first to get the session cookie
      request(URL)
        .post('/api/sessions/login')
        .send(credentials)
        .expect(200)
        .end((err, res) => {
          const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
          // Get the product by id
          request(URL)
            .get('/api/products/63f2b1c16dbbb43354b8ab9e')
            .set('Cookie', sessionCookie)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.be.an('object');
              expect(res.body).has.property('title');
              expect(res.body.title).to.equal('Harry Potter y el prisionero de Azkaban');
              expect(res.body).has.property('description');
              expect(res.body.description).to.equal('Libro 3 de la saga de Harry Potter');
              expect(res.body).has.property('price');
              expect(res.body.price).to.equal(950);
              expect(res.body).has.property('code');
              expect(res.body.code).to.equal('hp3');
              expect(res.body).has.property('thumbnails');
              expect(res.body.thumbnails).to.be.an('array');
              expect(res.body).has.property('status');
              expect(res.body.status).to.equal(false);
              expect(res.body).has.property('stock');
              expect(res.body.stock).to.equal(25);
              expect(res.body).has.property('category');
              expect(res.body.category).to.equal('action');
              done();
            });
        });
    });
  })

  describe('add a product, update the product and delete the product', () => {
    it('add, update and delete a product', (done) => {
      const code = uuidv4();
      const product = {
        "title": "ootro1",
        "description": "3",
        "price": 8,
        "code": code,
        "thumbnails": ["hola"],
        "status": false,
        "stock": 25,
        "category": "23"
      }

      request(URL)
        .post('/api/sessions/login')
        .send(credentials)
        .expect(200)
        .end((err, res) => {
          const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
          // Add a new product
          request(URL)
            .post('/api/products')
            .set('Cookie', sessionCookie)
            .send(product)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.be.an('object');
              expect(res.body).has.property('status');
              expect(res.body.status).to.equal('ok');
              expect(res.body).has.property('message');
              expect(res.body.message).to.equal('Added product');
              expect(res.body).has.property('payload');
              expect(res.body.payload).to.be.an('object');
              expect(res.body.payload).has.property('title');
              expect(res.body.payload.title).to.equal(product.title);
              expect(res.body.payload).has.property('description');
              expect(res.body.payload.description).to.equal(product.description);
              expect(res.body.payload).has.property('price');
              expect(res.body.payload.price).to.equal(product.price);
              expect(res.body.payload).has.property('code');
              expect(res.body.payload.code).to.equal(product.code);
              expect(res.body.payload).has.property('thumbnails');
              expect(res.body.payload.thumbnails).to.be.an('array');
              expect(res.body.payload).has.property('status');
              expect(res.body.payload.status).to.equal(product.status);
              expect(res.body.payload).has.property('stock');
              expect(res.body.payload.stock).to.equal(product.stock);
              expect(res.body.payload).has.property('category');
              expect(res.body.payload.category).to.equal(product.category);

              const productUpdated = {
                "title": "Nuevo",
                "description": "4",
                "price": 10,
                "code": code,
                "thumbnails": ["hola"],
                "status": false,
                "stock": 25,
                "category": "23"
              }

              const id = res.body.payload.id;

              request(URL)
                .put(`/api/products/${id}`)
                .set('Cookie', sessionCookie)
                .send(productUpdated)
                .expect(200)
                .end((err, res) => {
                  if (err) return done(err);
                  expect(res.body).to.be.an('object');
                  expect(res.body).has.property('status');
                  expect(res.body.status).to.equal('ok');
                  expect(res.body).has.property('message');
                  expect(res.body.message).to.equal('Updated product');
                  expect(res.body).has.property('payload');
                  expect(res.body.payload).to.be.an('object');
                  expect(res.body.payload).has.property('title');
                  expect(res.body.payload.title).to.equal(productUpdated.title);
                  expect(res.body.payload).has.property('description');
                  expect(res.body.payload.description).to.equal(productUpdated.description);
                  expect(res.body.payload).has.property('price');
                  expect(res.body.payload.price).to.equal(productUpdated.price);
                  expect(res.body.payload).has.property('code');
                  expect(res.body.payload.code).to.equal(productUpdated.code);
                  expect(res.body.payload).has.property('thumbnails');
                  expect(res.body.payload.thumbnails).to.be.an('array');
                  expect(res.body.payload).has.property('status');
                  expect(res.body.payload.status).to.equal(productUpdated.status);
                  expect(res.body.payload).has.property('stock');
                  expect(res.body.payload.stock).to.equal(productUpdated.stock);
                  expect(res.body.payload).has.property('category');
                  expect(res.body.payload.category).to.equal(productUpdated.category);

                  request(URL)
                    .delete(`/api/products/${id}`)
                    .set('Cookie', sessionCookie)
                    .expect(200)
                    .end((err, res) => {
                      if (err) return done(err);
                      expect(res.body).to.be.an('object');
                      expect(res.body).has.property('status');
                      expect(res.body.status).to.equal('ok');
                      expect(res.body).has.property('message');
                      expect(res.body.message).to.equal('Deleted product');
                      expect(res.body).has.property('payload');
                      expect(res.body.payload).to.equal(id);

                      done();
                    });
                });
            });
        })

    })


  })


})