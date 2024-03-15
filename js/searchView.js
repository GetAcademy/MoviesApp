function updateViewSearch() {
    document.getElementById('app').innerHTML = /*HTML*/`
        <h1>Filmer fra 2020-tallet</h1>
        <div>
            ${createFilterFormHtml()}
        </div>
        <div>
            ${createPagingHtml()}
        </div>
        <table>
            ${createHeaderRow()}
            ${createMoviesHtml()}
        </table>
    `;
}

function createHeaderRow() {
    return /*HTML*/`    
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
    `;
}

function createPagingHtml() {
    const selectedPageNo = model.inputs.search.pageNo;
    let html = '';
    const pageCount = model.movies.length / 10;
    for (let pageNo = 1; pageNo < pageCount; pageNo++) {
        if (pageCount > 20 && pageNo > 10 && pageNo < pageCount - 10) continue;
        html += selectedPageNo == pageNo ? ` <b>${pageNo}</b>` :
            /*HTML*/` <a href="javascript:selectPage(${pageNo})">${pageNo}</a>`;
        if (pageCount > 20 && pageNo == 10) html += ' ...';
    }
    return html;
}

function createFilterFormHtml() {
    const filter = model.inputs.search.filter;
    if (filter == null) {
        return /*HTML*/`<button onclick="updateFilterMode(true)">Filtrer</button>`;
    }
    return /*HTML*/`
        Tittel: <br/>
        <input 
            type="text" 
            oninput="model.inputs.search.filter.title=this.value"
            value="${model.inputs.search.filter.title ?? ''}"            
            />
            <br/>
        Sjanger: <br/>
        <select onchange="model.inputs.search.filter.genre=this.value">
            ${createOptionsHtml(model.genres, model.inputs.search.filter.genre)}
        </select>
        <br/>
        År: <br/>
        <select onchange="model.inputs.search.filter.year=this.value">
            ${createOptionsHtml(model.years, model.inputs.search.filter.year)}
        </select>
        <br/>
        <button onclick="updateView()">Filtrer</button>        
        <button onclick="updateFilterMode(false)">Avbryt</button>        
    `;
}

function createOptionsHtml(values, selectedValue) {
    let html = /*HTML*/`<option ${selectedValue == null ? 'selected' : ''}></option>`;
    for (let value of values) {
        html += /*HTML*/`<option ${selectedValue == value ? 'selected' : ''}>${value}</option>`
    }
    return html;
}

function getDisabled(field, direction) {
    const sort = model.inputs.search.sort;
    if (!sort) return '';
    return sort.field == field && sort.direction == direction ? 'disabled' : '';
}

function createMoviesHtml() {
    let html = '';
    let movies = doSelectedFilter(model.movies);
    movies = doSelectedSort(movies);
    movies = showOnlySelectedPage(movies);

    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        html += /*HTML*/`
            <tr>
                <td><img class="movie" src="${movie.thumbnail}"/></td>
                <td>
                    ${movie.title} 
                    <button onclick="showMovie(${i})">vis</button>
                </td>
                <td>${movie.genres.join(', ')}</td>
                <td>${movie.year}</td>
            </tr>
        `;
    }
    return html;
}

function showOnlySelectedPage(movies) {
    const pageNo = model.inputs.search.pageNo;
    if (pageNo == null) return movies;
    const startIndex = (pageNo - 1) * 10;
    return movies.slice(startIndex, startIndex + 10);
}

function doSelectedFilter(movies) {
    const filter = model.inputs.search.filter;
    if (filter == null) return movies;
    let filteredMovies = [];
    for (let movie of movies) {
        if (isMatch(filter.title, movie.title)
            && isMatch(filter.year, movie.year)
            && isMatch(filter.genre, movie.genres)) {
            filteredMovies.push(movie);
        }
    }
    return filteredMovies;
}

function isMatch(filterString, value) {
    if (typeof (filterString) != 'string'|| filterString == '') return true;
    return typeof(value)=='number'? filterString == number: value.includes(filterString);
}

function doSelectedSort(movies) {
    const sort = model.inputs.search.sort;
    if (sort == null) return movies;

    const field = sort.field;
    const direction = sort.direction;
    return movies.toSorted((a, b) =>
        a[field] == b[field] ? 0 :
        a[field] < b[field] ? -direction : direction
    );

    // if (sort != null) {
    //     const field = sort.field;
    //     const direction = sort.direction;
    //     movies = JSON.parse(JSON.stringify(movies));
    //     movies.sort((a, b) =>
    //         a[field] == b[field] ? 0 :
    //             a[field] < b[field] ? -direction : direction
    //     );
    // }
}