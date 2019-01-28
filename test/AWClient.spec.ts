import { expect } from 'chai';
import 'mocha';
import { Wrapper, XHRService, StorageService, AWClient, Adapter } from '../src/main';

function generateAdapter(uuid: string): Adapter {
    return new Adapter(uuid, '', '', '', '');
}

describe('AWClient tests', () => {

    let emptyPromise = new Promise<any>((r, e) => {});

    let wrapper = new (class _ extends Wrapper {
        name = '_';
        xhr = new (class _xhr implements XHRService { request(a: any, b: any){return emptyPromise;}})();
        storage = new (class _storage implements StorageService { get(a: any){return emptyPromise;}set(a:any,b:any){return emptyPromise;}})();
    })();

    let awClient: AWClient;

    beforeEach(() => {
        awClient = new AWClient(wrapper);
    });

    it('should return list of adapters', () => {
        expect(awClient.getAdapters()).to.deep.equal({});
    });

    it('should return the context for an adapter', () => {
        let adapter: Adapter = generateAdapter('uuid1');
        expect(awClient.getAdapterContext(adapter)).to.not.be.undefined;
    });

    it('should attach an adapter', (done) => {
        let adapter: Adapter = generateAdapter('uuid1');
        awClient.attachAdapter(adapter).then((response: any) => {
            expect(awClient.getAdapters()['uuid1']).to.not.be.undefined;
            done();
        });
    });

    it('should not attach duplicate adapter', (done) => {
        let adapter: Adapter = generateAdapter('uuid1');
        awClient.attachAdapter(adapter).then((response: any) => {
            awClient.attachAdapter(adapter).then(() => {}, (error: any) => {
                done();
            });
        });
    });

    it('should remove attached adapter with detachAdapter', (done) => {
        let adapter: Adapter = generateAdapter('uuid1');
        awClient.attachAdapter(adapter).then((response: any) => {
            awClient.detachAdapter(adapter.uuid);
            expect(awClient.getAdapters()).to.deep.equal({});
            done();
        });
    });

});