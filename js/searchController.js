function sort(fieldName, direction) {
    model.inputs.search.sort = { fieldName, direction };
    updateView();
}