function sort(fieldName, direction) {
    model.inputs.search.sort = { fieldName, direction };
    updateView();
}

function updateFilterMode(filterMode){    
    model.inputs.search.filter = !filterMode ? null : {
        title: '',
        genre: '',
        year: '',
    };
    updateView();
}