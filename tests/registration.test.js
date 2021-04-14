/* eslint-disable no-undef */
// const { request } = require('chai');
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
chai.should()

describe('make sure registraton fails if NAME is not provided during registration', () => {
  it('should return {"name":"\\"name\\" is required"}', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/registration')
      .send({
        // name: 'Jubril Etim',
        email: 'som@email.com',
        password: 'pass123'
      })
      .end((_err, res) => {
        console.log(res.text)
        res.should.have.status(200)
        res.text.should.contain('{"name":"\\"name\\" is required"}')
        done()
      })
  })
})

describe('make sure registraton fails if EMAIL is not provided during registration', () => {
  it('should return {"email":"\\"email\\" is required"}', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/registration')
      .send({
        name: 'Jubril Etim',
        // email: "som@email.com",
        password: 'pass123'
      })
      .end((_err, res) => {
        console.log(res.text)
        res.should.have.status(200)
        res.text.should.contain('{"email":"\\"email\\" is required"}')
        done()
      })
  })
})

describe('make sure registraton fails if PASSWORD is not provided during registration', () => {
  it('should return {"password":"\\"password\\" is required"}', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/registration')
      .send({
        name: 'Jubril Etim',
        email: 'som@email.com'
        // password: 'pass123'
      })
      .end((_err, res) => {
        console.log(res.text)
        res.should.have.status(200)
        res.text.should.contain('{"password":"\\"password\\" is required"}')
        done()
      })
  })
})

describe('make sure registration is successful with correct data', () => {
  it('should return success in response', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/registration')
      .send({
        name: 'Jubril Etim',
        email: `som${new Date().getTime()}@email.com`,
        password: 'pass123'
      })
      .end((_err, res) => {
        console.log(res.text)
        res.should.have.status(202)
        res.text.should.contain('isActive')
        done()
      })
  })
})
