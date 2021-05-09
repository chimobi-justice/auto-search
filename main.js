const searchTextInput = document.getElementById('searchTextInput');
const SearchMatchList = document.getElementById('SearchMatchList');

const searchStates = async searhTextValue => {
    const res = await fetch('data/states.json');
    const states = await res.json();

    let matches = states.filter(state => {
        const regex = new RegExp(`^${searhTextValue}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex) || state.capital.match(regex);
    });

    if (searhTextValue.length == 0) {
        matches = [];
        SearchMatchList.innerHTML = [];
    }

    outputData (matches);
}

const outputData = matches => {
    if (matches.length > 0) {
        const stateValues = matches.map(match => `
            <div class="card card-body mb-2 bg-dark">
                <h4 class="text-white">${match.name} (${match.abbr}) <span class="text-info">${match.capital}</span></h4>
            </div>
        `).join('');
        SearchMatchList.innerHTML = stateValues;
    } 
}

searchTextInput.addEventListener('input', () => searchStates(searchTextInput.value));


