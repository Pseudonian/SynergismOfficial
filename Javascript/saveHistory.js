/**
 * Insert a row into the save history.
 * @param {string} s Base64 save file 
 * @param {string} r reason for exporting save
 */
const insertSave = (s, r = 'export') => {
    const table = document.querySelector('#khafraSaveSubTab > div > table > tbody');
    const row = table.insertRow(0);

    row.insertCell(0).innerHTML = `
    <a href="data:text/plain;charset=utf-8,${s}" download="${saveFilename()}" id="downloadSave" style="border:2px solid orange">
        Download Save
    </a>
    `;
    row.insertCell(1).innerHTML = `
    <a id="copyToClipboardRow" style="border:2px solid gold" onclick="onClickCopy(this)">Copy to Clipboard</a>
    `;
    const time = row.insertCell(2);
    row.insertCell(3).textContent = getReason(r);
    row.insertCell(4).innerHTML = `<img style="max-width:22%;" src="https://twemoji.maxcdn.com/v/latest/72x72/1f5d1.png" onclick="removeCell(this)"></img>`;
    
    // time labels
    time.id = 'timeRow';
    time.setAttribute('data-time', `${Date.now()}`);

    while(table.rows.length > 20) {
        table.deleteRow(table.rows.length - 1);
    }

    for(const row of table.rows) {
        const children = Array.from(row.childNodes); // NodeList -> Array
        const timeRow = children.find(n => n.id === 'timeRow');
        const ms = timeRow.getAttribute('data-time');
        const diff = (Date.now() - +ms) / 60000;
        
        timeRow.textContent = diff < 1 
            ? 'A few seconds ago.'
            : `${Math.floor(diff).toLocaleString()} minute${Math.floor(diff) === 1 ? '' : 's'} ago.`; 
    }
}

/**
 * click event to handle copy to clipboard
 * @param {HTMLTableCellElement} e
 */
const onClickCopy = async (e) => {
    e.textContent = '✅';
    setTimeout(e => e.textContent = 'Copy to Clipboard', 2000, e);

    const parent = e.parentNode.parentNode;
    const href = parent.querySelector('td a[href]').href;
    const save = href.split(',').pop();

    return navigator.clipboard.writeText(save);
}

const getReason = (r) => {
    switch(r) {
        case 'export': return 'User exported save.';
        case 'auto': return 'Auto exported save.';
    }
}

/**
 * Remove a row from the table.
 * @param {HTMLTableCellElement} e
 */
const removeCell = async (e) => {
    const table = document.querySelector('#khafraSaveSubTab > div > table > tbody');
    const children = Array.from(table.childNodes);
    table.deleteRow(children.indexOf(e.parentNode.parentNode));

    const parent = e.parentNode.parentNode;
    const href = parent.querySelector('td a[href]').href;
    const save = href.split(',').pop();

    await kDBWait();
    const all = await kDBSortByAge();
    const same = all.find(o => o.save === save);
    if(same) await kDBRemove(same.time);
}
