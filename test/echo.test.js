const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('Echo Server', () => {
    describe('POST /', () => {
        it('should echo plain text with text/plain content-type', (done) => {
            const testBody = 'Hello, World!';

            chai.request(app)
                .post('/')
                .set('Content-Type', 'text/plain')
                .send(testBody)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.header('content-type', /text\/plain/);
                    res.text.should.equal(testBody);
                    done();
                });
        });

        it('should echo JSON and preserve application/json content-type', (done) => {
            const testBody = { message: 'Hello', count: 42 };

            chai.request(app)
                .post('/')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(testBody))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.header('content-type', /application\/json/);
                    JSON.parse(res.text).should.deep.equal(testBody);
                    done();
                });
        });

        it('should handle empty body with default text/plain content-type', (done) => {
            chai.request(app)
                .post('/')
                .set('Content-Length', '0')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.header('content-type', /text\/plain/);
                    res.text.should.equal('');
                    done();
                });
        });
    });
});