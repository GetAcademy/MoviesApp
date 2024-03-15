function sort(field, direction) {
    model.inputs.search.sort = { field, direction };
    updateView();
}

function updateFilterMode(filterMode) {
    model.inputs.search.filter = !filterMode ? null : {
        title: '',
        genre: '',
        year: '',
    };
    updateView();
}

function selectPage(pageNo) {
    model.inputs.search.pageNo = pageNo;
    updateView();
}

function showMovie(index) {
    model.inputs.preview.movieIndex = index;
    model.app.currentPage = 'preview';
    updateView();
}

function filter(){
    model.inputs.search.pageNo = 1;
    updateView();
}