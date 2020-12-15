/**
 * @type {IDBDatabase | null}
 */
let db = null;

const req = window.indexedDB.open('Synergism', 1);
req.addEventListener('error', console.log);
req.addEventListener('success', () => db = req.result);
req.addEventListener('upgradeneeded', ({ target/*, oldVersion, newVersion*/ }) => {
    const _db = target.result;
    _db.createObjectStore('synergism');
});

const read = (k) => {
    const _req = db
        .transaction(['synergism'])
        .objectStore('synergism')
        .get(k);

    return new Promise((res, rej) => {
        _req.addEventListener('error', rej);
        _req.addEventListener('success', () => res(_req.result));
    });
}

const readAll = () => {
    const cursor = db
        .transaction('synergism')
        .objectStore('synergism')
        .openCursor();
    const sv = [];

    return new Promise((res) => {
        cursor.addEventListener('success', e => {
            const c = e.target.result;
            if(c) {
                sv.push(c.value);
                c.continue();
            } else {
                return res(sv);
            }
        });
    });
}

const add = (o) => {
    const _req = db
        .transaction(['synergism'], 'readwrite')
        .objectStore('synergism')
        .add(o);

    return new Promise((res, rej) => {
        _req.addEventListener('success', res);
        _req.addEventListener('error', rej);
    });
}

const remove = (k) => {
    const _req = db
        .transaction(['synergism'], 'readwrite')
        .objectStore('synergism')
        .delete(k);

    return new Promise((res, rej) => {
        _req.addEventListener('error', rej);
        _req.addEventListener('success', res);
    });
}