function setEleDisplay(selector, display) {
    var ele = document.querySelector(selector);
    if (!ele) {
        console.error('Element with selector ' + selector + ' not found in document.');
        return;
    }
    ele.style.display = display;
};

function showEle(selector) { setEleDisplay(selector, 'flex'); };
function hideEle(selector) { setEleDisplay(selector, 'none'); };

function buildSpellRows(rows, dropdowns) {
    let output = [];
    for(let i = 0; i < rows.length; i++){
        const row = rows[i];
        const dropdown = dropdowns[i];

        output.push(row);
        output.push(dropdown);
    }
    return output;
};

function searchSpells(username) {
    const searchName = document.getElementById('search-name');
    const searchLevel = document.getElementById('search-level');
    const searchSchool = document.getElementById('search-school');

    const url = `/users/${username}/spells/search?name=${searchName.value || ''}&level=${searchLevel.value || ''}&school=${searchSchool.value || ''}`;

    const ajax = new XMLHttpRequest();

    ajax.open("GET", url, true);

    ajax.onload = () => {
        hideEle('.c-loadingbg')
        const responseData = JSON.parse(ajax.responseText);
        const rowData = responseData.rows;
        const dropdownData = responseData.dropdowns;
        
        const output = buildSpellRows(rowData, dropdownData);
        document.querySelector('.l-spells').innerHTML = output.join('\r');
        setupSpellTables();
    }

    ajax.onerror = () => {
        hideEle('.c-loadingbg')
        console.log('error');
    }

    ajax.send();
    showEle('.c-loadingbg')
};