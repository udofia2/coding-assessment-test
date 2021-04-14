/* eslint-disable no-undef */
// const { request } = require('chai');
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
chai.should()

describe('home route should return 200 status code', () => {
  it('should return 200 success code', (done) => {
    chai.request(app)
      .get('/')
      // eslint-disable-next-line node/handle-callback-err
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.an('object')
        done()
      })
  })
})
