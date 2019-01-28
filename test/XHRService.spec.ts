import { expect } from 'chai';
import 'mocha';
import { XHRService, XHROptions } from '../src/main';

describe('XHRService spec', () => {

    let xhrService: any;

    xhrService = new (class _ implements XHRService {
        request(url: string, options: any = new XHROptions): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                resolve({url, options});
            });
        }
    })();

    it('should resolve with no options', (done) => {
        xhrService.request('http://example.com')
            .then((data: any) => {
                expect(data.url).to.equal('http://example.com');
                expect(data.options.method).to.equal('GET');
                expect(data.options.async).to.be.true;
                expect(data.options.user).to.be.undefined;
                expect(data.options.password).to.be.undefined;
                expect(data.options.withCredentials).to.be.false;
                expect(data.options.serialize).to.not.be.undefined;
                expect(data.options.deserialize).to.not.not.undefined;
                done();
            });
    });

    it('should resolve with different method', (done) => {
        xhrService.request('http://example.com', new XHROptions({ method: 'POST' }))
            .then((data: any) => {
                expect(data.url).to.equal('http://example.com');
                expect(data.options.method).to.equal('POST');
                expect(data.options.async).to.be.true;
                expect(data.options.user).to.be.undefined;
                expect(data.options.password).to.be.undefined;
                expect(data.options.withCredentials).to.be.false;
                expect(data.options.serialize).to.not.be.undefined;
                expect(data.options.deserialize).to.not.not.undefined;
                done();
            });
    });

    it('should encode numeric URL parameters', (done) => {
        let xhrOptions = new XHROptions({
            data: {
                id: 123
            }
        });
        xhrService.request(xhrOptions.encodeUrlParameters('http://example.com/:id/profile'), xhrOptions)
            .then((data: any) => {
                expect(data.url).to.equal('http://example.com/123/profile');
                done();
            });
    });

    it('should encode string URL parameters', (done) => {
        let xhrOptions = new XHROptions({
            data: {
                id: '123'
            }
        });
        xhrService.request(xhrOptions.encodeUrlParameters('http://example.com/:id/profile'), xhrOptions)
            .then((data: any) => {
                expect(data.url).to.equal('http://example.com/123/profile');
                done();
            });
    });

    it('should not encode URL parameters if not present in data', (done) => {
        let xhrOptions = new XHROptions({
            data: {
                not_id: '123'
            }
        });
        xhrService.request(xhrOptions.encodeUrlParameters('http://example.com/:id/profile'), xhrOptions)
            .then((data: any) => {
                expect(data.url).to.equal('http://example.com/:id/profile');
                done();
            });
    });

});