const model = {
    app: {
        currentPage: 'search',
    },
    inputs: {
        search: {
            sort: null, // { field: 'title', direction: 1 }
            filter: null, // { title: '', genre: '', year: '' }
        },
        add: {

        },
        edit: {

        },
    },
    movies: [], // leses inn via movies.js
};

model.genres = new Set();
model.years = new Set();
for(let movie of model.movies){
    model.years.add(movie.year);
    let genres = movie.genres.split(',');
    for(let genre of genres){
        model.genres.add(genre);
    }
}