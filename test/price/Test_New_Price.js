var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    dotenv    = require('dotenv').config({path: './.env'}),
    uriTest   = process.env.APP_URL + ':' + process.env.APP_PORT;

chai.use(chaiHttp);


/*
 * Test POST: /api/price
 */

var listData = [
  {
    it     : 'CASE: New price failed because `value` has schematype min=0',
    send   : {'price': {'value': '-1'}},
    matched: {'errors': 'Price validation failed: value: Path `value` (-1) is less than minimum allowed value (0).'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: New price failed because `layer` has schematype min=0',
    send   : {'price': {'layer': '-1'}},
    matched: {'errors': 'Price validation failed: layer: Path `layer` (-1) is less than minimum allowed value (0).'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: New price failed because `active` has schematype min=0',
    send   : {'price': {'active': '-1'}},
    matched: {'errors': 'Price validation failed: active: Path `active` (-1) is less than minimum allowed value (0).'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: New price failed because `active` has schematype max=1',
    send   : {'price': {'active': '2'}},
    matched: {'errors': 'Price validation failed: active: Path `active` (2) is more than maximum allowed value (1).'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: New price failed because `group` has schematype ObjectID',
    send   : {'price': {'group': 'abc34324'}},
    matched: {'errors': 'Price validation failed: group: Cast to ObjectID failed for value \"abc34324\" at path \"group\"'}
  },
];

describe('POST /api/price -> New a price object', () => {
    for (let data of listData) {

        it(data.it, (done) => {
            chai.request(uriTest)
                .post('/api/prices')
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