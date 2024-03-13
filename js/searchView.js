function updateViewSearch() {
    document.getElementById('app').innerHTML = /*HTML*/`
        <h1>Film-søk</h1>
        <table>
            <tr>
                <th></th>
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
                <td>
                    ${movie.title}
                </td>
            </tr>
        `;

        "Title": "Avatar",
            "Year": "2009",
                "Rated": "PG-13",
                    "Released": "18 Dec 2009",
                        "Runtime": "162 min",
                            "Genre": "Action, Adventure, Fantasy",
                                "Director": "James Cameron",
    }
    return html;
}