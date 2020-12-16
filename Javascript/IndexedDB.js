/**
 * @type {IDBDatabase | null}
 */
let db = null;

const req = window.indexedDB.open('Synergism', 1);
req.addEventListener('error', console.log);
req.addEventListener('success', () => db = req.result);
req.addEventListener('upgradeneeded', ({ target/*, oldVersion, newVersion*/ }) => {
    const _db = target.result;
    _db.createObjectStore('synergism', { keyPath: 'time' });
});

/**
 * Wait until the DB opens
 */
const kDBWait = () => {
    let i = 0;
    return new Promise((res, rej) => {
        if(db) return res(db);
        setInterval(() => {
            if(db) return res(db);
            if(i++ > 10) return rej();
        }, 1000);
    });
}

const kDBRead = (k) => {
    const _req = db
        .transaction(['synergism'], 'readonly')
        .objectStore('synergism')
        .get(k);

    return new Promise((res, rej) => {
        _req.addEventListener('error', rej);
        _req.addEventListener('success', () => res(_req.result));
    });
}

const kDBReadAll = () => {
    const cursor = db
        .transaction('synergism', 'readonly')
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

const kDBAdd = (o) => {
    const _req = db
        .transaction(['synergism'], 'readwrite')
        .objectStore('synergism')
        .add(o);

    return new Promise((res, rej) => {
        _req.addEventListener('success', res);
        _req.addEventListener('error', rej);
    });
}

const kDBRemove = (k) => {
    const _req = db
        .transaction(['synergism'], 'readwrite')
        .objectStore('synergism')
        .delete(k);

    return new Promise((res, rej) => {
        _req.addEventListener('error', rej);
        _req.addEventListener('success', res);
    });
}

// Helper functions 

/**
 * Returns an array of save objects newest -> oldest
 */
const kDBSortByAge = async () => {
    await kDBWait();
    const all = await kDBReadAll();
    const newest = all.sort((a, b) => b.time - a.time);

    return newest;
}

const kDBRemoveAll = async () => {
    await kDBWait();
    const all = await kDBReadAll();
    for(const { time } of all) {
        await kDBRemove(time);
    }
}

const kDBRemoveOld = async () => {
    const newest = await kDBSortByAge();
    if(newest.length > 20) {
        const toRemove = newest.length - 20;
        const removing = newest.reverse().slice(0, toRemove);
        for(const obj of removing) {
            await kDBRemove(obj.time);
        }
    } else if(!newest || newest.length === 0 || !newest[0].save) return [];

    // if newest has less than 20 saves, won't be reversed
    // so let's just sort it again to guarantee its order
    return newest.sort((a, b) => b.time - a.time);
}