function sort(fieldName, direction) {
    model.inputs.search.sort = { fieldName, direction };
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