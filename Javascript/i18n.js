class i18n {
    T = {}; // Record<string, string>;

    constructor(locale = 'en-US') {
        this.locale = locale || navigator.language;
    }

    async fetch() {
        let res; /* Response */
        try {
            res = await fetch(`./i18n/${this.locale}.json`);
        } catch(e) {
            return Promise.reject(e);
        }

        if(!res.ok) {
            return Promise.reject(e);
        } else {
            const json = await res.json(); /* Record<string, string> */
            Object.assign(this.T, json);
        }

        return Promise.resolve();
    }

    get all() {
        return this.T;
    }

    t(key /* string */) {
        if(!(key in this.T)) {
            return ''; 
            // should throw an error but a bunch of achievements
            // attempt to search for non-existent keys

            // throw new Error(`Fetched invalid key ${key}!`);
        }

        return this.T[key];
    }
}