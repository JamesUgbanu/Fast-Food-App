const expect  = require('chai').expect;
const supertest = require('supertest');
import bcrypt from 'bcrypt-nodejs';
import 'babel-polyfill';
const app = require('../server');
import Helper from '../src/UsingDB/controller/Helper';
import User from '../src/UsingDB/controller/Users';
const api = supertest('http://127.0.0.1:3000');

		it('should return a 200 response', function(done) {
			api.get('/')
			.set('Accept', 'application/json')
			.expect(200);
			done()
		})
		describe("Checking out Helper function", function () {

            it("should not return null", () => {
                expect(Helper.hashPassword("admin")).to.not.equal(null);
            });

            it("encrypted password should match", () => {
            	const encrpytedPassword = Helper.hashPassword("admin")
                expect(Helper.comparePassword(encrpytedPassword, "admin")).to.equal(true);
            });

             it("checking for valid email", () => {
                expect(Helper.isValidEmail("singlecliq@gmail.com")).to.equal(true);
            });

             it("should return true if a token was generated", () => {
                expect(Helper.generateToken(2, true)).to.not.equal(null);
            });
        });

        describe("Testing for user route", () => {

        	it('should return some false when values are missing', done => {
        		api.post('/api/v1/user/register')
        		.set('Accept', 'application/x-www-form-urlencoded')
        		.send({
        			"email": "",
        		})
        		.expect(400)
        		.end((err, res) => {
        			expect(res.body.success).to.equal("false");
        			done();
        		})
        	})


		    it('should create new user', done => {
			api.post('/api/v1/user/register')
			.set('Accept', 'application/x-www-form-urlencoded')
			.send({
				'email': "admin5@gmail.com",
				'password': "admin"
			})
				.expect(201)
				.end((err, res) => {
					expect(res.body.success).to.have.equal("true");
					done();
				})
        	});

        	 it('should return true if user is successfully authenticated', done => {
			api.post('/api/v1/user/authenticate')
			.set('Accept', 'application/x-www-form-urlencoded')
			.send({
				'email': "admin2@gmail.com",
				'password': "admin"
			})
				.expect(200)
				.end((err, res) => {
					expect(res.body.success).to.equal("true");
					done();
				})
        	});

        	  it('should return true if user is authorised to delete', done => {
			api.delete('/api/v1/user/6')
				.expect(401)
				.end((err, res) => {
					console.log(res.body)
					expect(res.body.success).to.equal("false");
					done();
				})
        	});

		});
// it('should return a 200 response', function(done) {
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
