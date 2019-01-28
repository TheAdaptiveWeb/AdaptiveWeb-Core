import { expect } from 'chai';
import 'mocha';
import { Wrapper, AWClient, Adapter } from '../src/main';
import { getGenericWrapper, generateAdapter } from './helper';

describe('AWClient tests', () => {

    let wrapper: Wrapper, awClient: AWClient;

    before(() => {
        wrapper = getGenericWrapper();
    })

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

    it('should save adapter preferences', (done) => {
        let adapter: Adapter = generateAdapter('uuid1');
        awClient.attachAdapter(adapter).then((response: any) => {
            awClient.setAdapterPreferences(adapter.uuid, {});
            wrapper.storage.get('uuid1/preferences').then((res: any) => {
                expect(res).to.not.be.undefined;
                done();
            });
        });
    });

});