const should  = require('chai').should();
const expect  = require('chai').expect;
const supertest = require('supertest');
const app = require('../build/server')

api = supertest('http://127.0.0.1:5000');

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
it('should not be able to access update order if token not admin', function(done) {
	api.put('/api/v1/item/')
	.set('Accept', 'application/x-www-form-urlencoded')
	.send({
		userId: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzODE0NjAyMSwiZXhwIjoxNTM4NzUwODIxfQ.F-mPeEOAc0kwT99l69bDhRRxMIKF0c_XvUznxhCE7mw,
		isAdmin: false
	})
	.expect(401)
	.end(function(err, res) {
		if(err) return done(err);
		console.log(error)
		// expect(res.error).to.not.equal.("Unauthorised Access");
		done();
	})
})