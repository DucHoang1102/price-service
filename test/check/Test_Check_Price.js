var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    dotenv    = require('dotenv').config({path: './.env'}),
    uriTest   = process.env.APP_URL + ':' + process.env.APP_PORT;

chai.use(chaiHttp);

/*
 * Test POST: /api/check
 */
var listData = [
  {
    it     : 'CASE: Success!!!',
    send   : {'price': {
        'match': 'A-14-CT1-M-1'
    }},
    matched: {'price': 111000}
  },
//-------------------------------------------------------------------------------
{
    it     : 'CASE: Success!!!',
    send   : {'price': {
        'match': 'A-33wesds-CT1-XXL-2'
    }},
    matched: {'price': 150000}
  },
//-------------------------------------------------------------------------------
{
    it     : 'CASE: Return null!!!',
    send   : {'price': {
        'match': 'A12CT1S1'
    }},
    matched: {'price': null}
  },
//-------------------------------------------------------------------------------
{
    it     : 'CASE: Return null because active 0!!!',
    send   : {'price': {
        'match': '1111'
    }},
    matched: {'price': null}
  },
//-------------------------------------------------------------------------------
{
    it     : 'CASE: Success group - price!!!',
    send   : {'price': {
        'match': '112233',
        'idGroup': '5d8db2c9371e232ca04cf0a1'
    }},
    matched: {'price': 9999}
  }
];

// First, create some price 
chai.request(uriTest)
    .post('/api/prices')
    .send({
        'price': {
            'name': 'Áo đôi',
            'regexp': '^(A)-(.*)-(CT1)-(.*)-(2)$',
            'active': 1,
            'layer': 0,
            'value': 150000
        }
    }).end()

chai.request(uriTest)
    .post('/api/prices')
    .send({
        'price': {
            'name': 'Áo đôi',
            'regexp': '^(A)-(14)-(CT1)-(M)-(1)$',
            'active': 1,
            'layer': 1,
            'value': 111000
        }
    }).end()

chai.request(uriTest)
    .post('/api/prices')
    .send({
        'price': {
            'name': 'Áo đôi',
            'regexp': '^(1111)$',
            'active': 0,
            'layer': 0,
            'value': 3333
        }
    }).end()

// Second, create a group and some price
var idGroup = chai.request(uriTest)
    .post('/api/groups')
    .send({
        'group': {
            '_id': '5d8db2c9371e232ca04cf0a1',
            'name': 'Cài đặt giá áo đôi',
            'description': ''
        }
    }).end()

chai.request(uriTest)
    .post('/api/prices')
    .send({
        'price': {
            'name': 'Áo đôi',
            'regexp': '^(112233)$',
            'active': 1,
            'layer': 0,
            'value': 9999,
            'group': '5d8db2c9371e232ca04cf0a1'
        }
    }).end()

///////////////////// RUN TEST /////////////////////////////////
describe('GET /api/check -> Check price of production', () => {
    for (let data of listData) {

        it(data.it, (done) => {
            chai.request(uriTest)
                .get('/api/check')
                .send(data.send)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.nested.include(data.matched);

                    done();
                });
        });
    }
});
