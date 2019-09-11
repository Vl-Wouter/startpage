// Search bar animation
const searchLogo = document.querySelector('#searchLogo')
const search = document.querySelector('#searchContainer')
const searchBar = document.querySelector('#searchQuery')

const switchSearch = () => {
    search.classList.toggle('--closed')
    if(search.classList.contains('--closed')) searchBar.value = ""
}

searchLogo.addEventListener('click', switchSearch)

// Hijack search form
const searchForm = document.querySelector('#googleSearch')

function searchIt(e) {
    if(e.preventDefault) e.preventDefault()

    let query = searchBar.value
    const querySplit = query.split(' ');
    const finalQuery = querySplit.join('+');
    console.log(finalQuery)
    searchBar.value = "";
    window.location.href=`https://www.google.com/search?q=${finalQuery}`

    
}
searchForm.addEventListener('submit', searchIt)