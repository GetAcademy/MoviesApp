function updateViewSearch() {
    document.getElementById('app').innerHTML = /*HTML*/`
        <h1>Film-søk</h1>
        ${createFilterFormHtml()}
        <table>
            <tr>
                <th></th>
                <th>
                    Tittel 
                    <button onclick="sort('title',1)" ${getDisabled('title', 1)}>▲</button>
                    <button onclick="sort('title',-1)" ${getDisabled('title', -1)}>▼</button>
                </th>
                <th>
                    Sjanger 
                    <button onclick="sort('genre',1)" ${getDisabled('genre', 1)}>▲</button>
                    <button onclick="sort('genre',-1)" ${getDisabled('genre', -1)}>▼</button>
                </th>
                <th>
                    År 
                    <button onclick="sort('year',1)" ${getDisabled('year', 1)}>▲</button>
                    <button onclick="sort('year',-1)" ${getDisabled('year', -1)}>▼</button>
                </th>
            </tr>
            ${createMoviesHtml()}
        </table>
    `;
}

function createFilterFormHtml() {
    const filter = model.inputs.filter;
    if (filter == null) return /*HTML*/`<button onclick="updateFilterMode(true)">Filtrer</button>`;
    return /*HTML*/`
        <button onclick="updateFilterMode(false)">Skru av filtrering</button>        
    `;
}

function getDisabled(fieldName, direction) {
    const sort = model.inputs.search.sort;
    if (!sort) return '';
    return sort.fieldName == fieldName && sort.direction == direction ? 'disabled' : '';
}

function createMoviesHtml() {
    let html = '';
    const movies = model.movies;
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        html += /*HTML*/`
            <tr>
                <td><img class="movie" src="${movie.thumbnail}"/></td>
                <td>${movie.title}</td>
                <td>${movie.genres.join()}</td>
                <td>${movie.year}</td>
            </tr>
        `;
    }
    return html;
}