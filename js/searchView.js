function updateViewSearch() {
    document.getElementById('app').innerHTML = /*HTML*/`
        <h1>Film-søk</h1>
        <table>
            <tr>
                <th>Tittel</th>
                <th>År</th>
                <th>Regissør</th>
                <th>Sjanger</th>
            </tr>
            ${createMoviesHtml()}
        </table>
    `;
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
                <td>${movie.year}</td>
                <td>${movie.director}</td>
                <td>${movie.genres.join()}</td>
            </tr>
        `;
    }
    return html;
}