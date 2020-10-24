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

function buildCharCards(characters) {
    const output = [];
    for(const character of characters) {
        output.push(`
        <a class="c-card" href="/characters/${character.name}">
            <div class="c-card__header">
                <div class="c-card__header-left">
                    <h2>${character.name}</h2>
                </div>
                <div class="c-card__header-right"></div>
            </div>
        `);

        character.image != '' && character.image != undefined
            ? output.push(`<img class="c-card__image" src="http://res.cloudinary.com/duezou4td/image/upload/${character.image}.png" alt="${character.name}'s Image">`)
            : output.push(`<img class="c-card__image" src="https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png">`);
        output.push('</a>');
    }
    return output;
};

function searchCharacters() {
    const searchName = document.getElementById('search-name');
    const searchRelationship = document.getElementById('search-relationship');
    const searchPlace = document.getElementById('search-place');
    const searchRace = document.getElementById('search-race');

    const url = `/characters/search?name=${searchName.value || ''}&relationship=${searchRelationship.value || ''}&place=${searchPlace.value || ''}&race=${searchRace.value || ''}`;

    const ajax = new XMLHttpRequest();

    ajax.open("POST", url, true);

    ajax.onload = () => {
        hideEle('.c-loadingbg')
        const characterData = JSON.parse(ajax.responseText);
        
        output = buildCharCards(characterData);
        document.querySelector('.l-cards--4').innerHTML = output.join('\r');
        
        // Could use this in conjunction with res.render
        // document.write(ajax.responseText);
    }

    ajax.onerror = () => {
        hideEle('.c-loadingbg')
        console.log('error');
    }

    ajax.send();
    showEle('.c-loadingbg')
};