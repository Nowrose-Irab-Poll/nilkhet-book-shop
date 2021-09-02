const searchData = () => {


    const searchField = document.getElementById('search-input');
    const searchKeyword = searchField.value;

    const searchShow = document.getElementById('search-keyword');
    searchShow.innerText = `Showing Results for: "${searchKeyword}"`;

    toggleSpinner(true);
    clearResults();

    loadData(searchKeyword);
    searchField.value = '';

}

const loadData = key => {

    const url = `https://openlibrary.org/search.json?q=${key}`;
    fetch(url).then(res => res.json()).then(json => parseData(json));

}

const parseData = data => {
    const noOfResults = data.numFound;

    updateNoOfResults(noOfResults);

    const itemList = data.docs;
    toggleSpinner(false);
    showResults(itemList);
}

const updateNoOfResults = (count) => {
    if(count)  document.getElementById('no-of-results').innerText = `${count} Results Found`;
    else        document.getElementById('no-of-results').innerText = `Sorry. No Results Found`;
}

const showResults = itemList => {
    const cardList = document.getElementById('search-results');

    console.log(itemList.length);
    itemList.slice(0,21).forEach(element => {
        const item = createCard(element);
        cardList.appendChild(item);
    });

};

const createCard = (cardData) => {
    const title = cardData.title;
    let firstPublication = cardData?.first_publish_year;
    const authors = cardData?.author_name;
    const coverID = cardData?.cover_i;
    const coverUrl = `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`;

    let authorText = '';

    if(!firstPublication){
        firstPublication = "Not known";
    }

    if(authors){
        authorText = authors[0];

    } else {
        authorText = "Unknown";

    }

    const item = document.createElement('div');
    item.classList.add('col');
    item.innerHTML = `
    <div class="card h-100">
        <img src='${coverUrl}' class="card-img-top img-fluid" alt='${title}-cover-photo-${coverID}'>
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">Author: ${authorText}</p>
        </div>
        <div class="card-footer">
           <small class="text-muted">First Publication: ${firstPublication}</small>
        </div>
    </div>

    `;
    return item;
};

const clearResults = () => {
    document.getElementById('search-results').textContent = '';


};

const toggleSpinner = (flag, key) => {
    const spinner = document.getElementById('loading');
    const noOfResults = document.getElementById('no-of-results');

    if(flag){
        spinner.style.display = 'block';
        noOfResults.style.display = 'none';
    }
    else {
        noOfResults.style.display = 'block';
        spinner.style.display = 'none';
    }
}
