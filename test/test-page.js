const should  = require('chai').should();
const expect  = require('chai').expect;
const supertest = require('supertest');
const app = require('../server');

const api = supertest('http://127.0.0.1:5000');

it('should return a 200 response', function(done) {
	api.get('/api/v1/item')
	.set('Accept', 'application/json')
	.expect(200, done);
})

it('should be an object with keys and values', function(done) {
	api.get('/api/v1/item/1')
	.set('Accept', 'application/json')
	.expect(200)
	.end(function(err, res) {
		expect(res.body.message).to.have.property("name");
		expect(res.body.name).to.not.equal(null);
		expect(res.body.message).to.have.property("description");
		expect(res.body.description).to.not.equal(null);
		expect(res.body.message).to.have.property("price");
		expect(res.body.price).to.not.equal(null);
		done()
	})
})

it('should be create new user', function(done) {
	api.post('/api/v1/user/create')
	.set('Accept', 'application/x-www-form-urlencoded')
	.send({
		email: "admin2@gmail.com",
		password: "admin"
	})
	.expect(201)
	.end(function(err, res) {
		expect(res.body.token).to.not.equal(null);
		done();
	})
})
