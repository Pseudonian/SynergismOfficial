/**
 * Insert a row into the save history.
 * @param {string} s Base64 save file 
 */
const insertSave = (s) => {
    const table = document.querySelector('#khafraSaveSubTab > div > table');
    
    const row = table.insertRow(0);
    const dlButton = row.insertCell(0);
    const copyButton = row.insertCell(1);
    const time = row.insertCell(2);
    
    // button handling save downloads
    const a = document.createElement('a');
    a.textContent = 'Download Save';
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + s);
    a.setAttribute('download', saveFilename());
    a.setAttribute('id', 'downloadSave');
    a.setAttribute('style', 'border: 2px solid green;'); // same border as export button

    // button handling copy to clipboard
    const cpy = document.createElement('a');
    cpy.id = 'copyToClipboardRow';
    cpy.textContent = 'Copy to Clipboard';
    cpy.setAttribute('style', 'border: 2px solid gold');
    cpy.addEventListener('click', onClickCopy);

    // time labels
    time.id = 'timeRow';
    time.setAttribute('data-time', `${Date.now()}`);

    dlButton.appendChild(a);
    copyButton.appendChild(cpy);

    while(table.rows.length > 10) {
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

const onClickCopy = async e => {
    e.target.textContent = '✅';
    setTimeout(e => e.target.textContent = 'Copy to Clipboard', 2000, e);

    const save = localStorage.getItem('Synergysave2');
    return navigator.clipboard.writeText(save);
}