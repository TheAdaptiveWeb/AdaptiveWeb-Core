import { expect } from 'chai';
import 'mocha';
import { Wrapper, AdapterContext, Adapter } from '../src/main';
import { getGenericWrapper, generateAdapter } from './helper';

describe('AdapterContext spec', () => {

    let adapterContext: any;

    let wrapper: Wrapper, adapter: Adapter;

    before(() => {
        wrapper = getGenericWrapper();
    });

    beforeEach(() => {
        adapter = generateAdapter();
        adapterContext = new AdapterContext(wrapper, adapter);
    });

    it('should be able to send AJAX requests', (done) => {
        adapterContext.request('url').then((res: any) => {
            expect(res.url == 'url');
            done();
        });
    });

    it('should be able to access preferences', (done) => {
        wrapper.storage.set(adapter.uuid + '/preferences', {});
        adapterContext.getPreferences().then((res: any) => {
            expect(res).to.not.be.undefined;
            done();
        });
    });

});