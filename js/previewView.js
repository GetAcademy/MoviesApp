function updateViewPreview(){
    const index = model.inputs.preview.movieIndex;
    const movie = model.movies[index];

    document.getElementById('app').innerHTML = /*HTML*/`
        <h1>Pause til 13:08</h1>

        <h1>${movie.title}</h1>
        <img 
            src="${movie.thumbnail}"
            style="
                width: ${movie.thumbnail_width*4}; 
                height: ${movie.thumbnail_height*4}; 
                "
            />
        <div>
            <button>Tilbake</button>
        </div>
    `;
}