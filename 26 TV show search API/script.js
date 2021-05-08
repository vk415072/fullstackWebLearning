const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    //    console.dir(form)
    const searchTerm = form.elements.query.value;
    // sending req on custom search term
    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    // const res = await axios.get(`https://yts.mx/movies/${searchTerm}`);

    // getting the data
    // console.log(res.data);
    makeImages(res.data);
});

const makeImages = (shows) => {
    // looping through all recieved data arrays
    for (let result of shows) {
        // checking if every data has an image object
        if (result.show.image) {
            // creating image in html
            const img = document.createElement('IMG');
            // getting image from the recieved data
            img.src = result.show.image.medium;
            // setting the img to html img tag
            document.body.append(img);
        }

    }
}