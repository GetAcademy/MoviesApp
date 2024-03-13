function updateViewSearch(){
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

function createMoviesHtml(){
    const movies = model.movies;
    for(let i = 0; i < movies.length; i++){
        
    }
}