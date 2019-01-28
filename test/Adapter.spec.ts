import { expect } from 'chai';
import 'mocha';
import { Adapter } from '../src/main';

let adapterObj: any = {
    uuid: '0855cbc4-fa58-4d1b-a206-b07338f365d7',
    name: 'TestAdapter',
    description: 'testAdapter_description',
    version: '1.0.0',
    preferenceSchema: {}
}

describe('Adapter spec', () => {

    it('should initiate from object', () => {
        let adapter = Adapter.fromObject(adapterObj);
        expect(adapter.uuid).to.be.string(adapterObj.uuid);
        expect(adapter.name).to.be.string(adapterObj.name);
        expect(adapter.description).to.be.string(adapterObj.description);
        expect(adapter.version).to.be.string(adapterObj.version);
        expect(adapter.preferenceSchema).to.deep.equal(adapterObj.preferenceSchema);
    });

    it('should initiate from string', () => {
        let adapter = Adapter.fromObject(JSON.stringify(adapterObj));
        expect(adapter.uuid).to.be.string(adapterObj.uuid);
        expect(adapter.name).to.be.string(adapterObj.name);
        expect(adapter.description).to.be.string(adapterObj.description);
        expect(adapter.version).to.be.string(adapterObj.version);
        expect(adapter.preferenceSchema).to.deep.equal(adapterObj.preferenceSchema);
    });

});