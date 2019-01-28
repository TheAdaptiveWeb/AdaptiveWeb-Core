import { Adapter, Wrapper, XHRService, XHROptions, StorageService } from "../src/main";

/**
 * Generate an empty Adapter with an optional uuid
 * @param uuid the uuid of the adapter
 */
export function generateAdapter(uuid: string = 'uuid1'): Adapter {
    return new Adapter(uuid, '', '', '', '');
}

/**
 * Returns a wrapper with an in memory storage service and XHR request that 
 * returns an object containing the input url and options
 */
export function getGenericWrapper(): Wrapper {
    return new (class _ extends Wrapper {
        name = '_';
        xhr = new (class _ implements XHRService {
            request(url: string, options: any = new XHROptions): Promise<any> {
                return new Promise<any>((resolve, reject) => {
                    resolve({url, options});
                });
            }
        })();
        storage = new (class _storage implements StorageService {
            private store?: any = {};

            get(key: any){
                return new Promise<any>((resolve, reject) => {
                    resolve(this.store[key]);
                });
            }

            set(key:string,val:any){return new Promise<any>((resolve, reject) => {
                this.store[key] = val;
                resolve();
            });}
        })();
    })();
}