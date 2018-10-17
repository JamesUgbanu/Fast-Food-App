const expect  = require('chai').expect;
const supertest = require('supertest');
import 'babel-polyfill';
const server = require('../server');
const api = supertest(`localhost:${process.env.PORT}`);

		it('should return a 200 response', function(done) {
			api.get('/')
			.set('Accept', 'application/json')
			.expect(200);
			done()
		})

        describe("Testing for user route", () => {

        		let user = {
			        		'email': "admin34@gmail.com",
							'password': "admin"
        				}

        	it('should return true if a new user is successfully created', done => {
        		api.post('/api/v1/user/register')
        			.set('Accept', 'application/x-www-form-urlencoded')
        			.send(user)
        			.expect(201)
        			.end((err, res) => {
        				expect(res.body.success).to.equal('true');
        				expect(res.body.token).to.not.equal(null);
        				done();
        			})
        	})

        	 it('should return true if user is successfully authenticated', done => {
			api.post('/api/v1/user/authenticate')
			.set('Accept', 'application/x-www-form-urlencoded')
			.send(user)
				.expect(200)
				.end((err, res) => {
					expect(res.body.success).to.equal('true');
					expect(res.body.token).to.not.equal(null);
					done();
				})
        	});

		});




// it('should return a 200 response', (done) {
// 	api.get('/api/v1/item')
// 	.set('Accept', 'application/json')
// 	.expect(200, done);
// })

// it('should be an object with keys and values', function(done) {
// 	api.get('/api/v1/item/1')
// 	.set('Accept', 'application/json')
// 	.expect(200)
// 	.end(function(err, res) {
// 		expect(res.body.message).to.have.property("name");
// 		expect(res.body.name).to.not.equal(null);
// 		expect(res.body.message).to.have.property("description");
// 		expect(res.body.description).to.not.equal(null);
// 		expect(res.body.message).to.have.property("price");
// 		expect(res.body.price).to.not.equal(null);
// 		done()
// 	})
// })

// it('should be create new user', function(done) {
// 	api.post('/api/v1/user/create')
// 	.set('Accept', 'application/x-www-form-urlencoded')
// 	.send({
// 		email: "admin2@gmail.com",
// 		password: "admin"
// 	})
// 	.expect(201)
// 	.end(function(err, res) {
// 		expect(res.body.token).to.not.equal(null);
// 		done();
// 	})
// })
