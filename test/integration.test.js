const server = require('../server');
const supertest = require('supertest');

const chai = require('chai');
const expect = chai.expect;

describe('API endpoints', () => {

    it('should be online', (done) => {
        supertest(server)
            .get('/health')
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.type).to.equal('application/json');
                    expect(response.body['health']).to.equal('ok');
                    done();
                }
            });
    });

    it('handle routing errors', (done) => {
        supertest(server)
            .get('/isHealthy')
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).equals(404);

                    const errorType = 'ResourceNotFound';
                    //expect( response.body.toString() ).contains( errorType );
                    expect( response.body['code'] ).equals( errorType );
                    //expect( response.body['restCode'] ).equals( errorType );
                    done();
                }
            });
    });

    it('returns Html page as root context', (done) => {
        supertest(server)
            .get( `/` )
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    //expect(response.body).to.equal('hello');
                    done();
                }
            });
    });

    it('has API version 1', (done) => {
        supertest(server)
            .get( '/api/items/55' )
            .set( 'accept-version', '~1' )
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.a('string');
                    expect(response.body).to.equal('item: 55');
                    done();
                }
            });
    });

    it('has API version 2', (done) => {
        supertest(server)
            .get( '/api/items/1' )
            .set( 'accept-version', '~2' )
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.type).to.equal('application/json');
                    //expect(response.body).to.equal('hello 1');
                    done();
                }
            });
    });

    it('throws validation error on application creation', (done) => {
        supertest(server)
            .post('/api/applications')
            .send({ firstname: 'Manny', lastname: 'cat' })

            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(400);
                    done();
                }
            });
    });

    it('DB: create new application', (done) => {
        supertest(server)
            .post('/api/applications')
            .send({
                firstname: 'Manny',
                lastname: 'Smith',
                gender: 'male',
                email: 'a@b.com',
                phone: '123 45 67',
                age: '33',
                zip: '12345'

            })

            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(201);
                    expect(response.type).to.equal('application/json');
                    done();
                }
            });
    });

    it('get all applications from DB', (done) => {
        supertest(server)
            .get('/api/applications')
            .end((err, response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.type).to.equal('application/json');
                    done();
                }
            });
    });

});