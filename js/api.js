const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }

}
const displayCategory = categories => {
    const categoryContainer = document.getElementById('categoryContainer');
    categories.forEach(category => {
        const categoryUl = document.createElement('ul')
        categoryUl.classList.add('nav-tabs', 'nav');
        categoryUl.innerHTML = `
            <li class="nav-item">
                <a class="nav-link text-muted" onclick="loadCategoryNews('${category.category_id}')" href="#">${category.category_name}</a>
            </li>
        `
        categoryContainer.appendChild(categoryUl);
    });
}
const loadCategoryNews = async (id) => {
    spinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryNews(data.data);
    }
    catch (error) {
        console.log(error);
    }

}
const displayCategoryNews = newsArray => {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = `<p> ${newsArray.length} items found </p>`;
    newsArray.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    newsArray.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-2 col-sm-2">
                            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-10 col-sm-10">
                            <div class="card-body">
                                <h5 class="card-title">${news.title}</h5>
                                <p class="card-text">${news.details.slice(0, 350)}..</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="d-flex">
                                        <img style="width: 50px;" class="rounded-circle" src="${news.author.img}" alt="">
                                        <p>${news.author.name ? news.author.name : 'No author'}<br>${news.author.published_date ? news.author.published_date : 'No date found'}</p>
                                    </div>
                                    <p>Total View: ${news.total_view ? news.total_view : 'No views'}</p>
                                    <button onclick="modalBody('${news._id}')" type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
    spinner(false);
}
const modalBody = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayModalBody(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }

}
const displayModalBody = categories => {
    const modalBodyText = document.getElementById('modalBody');
    modalBodyText.innerText = `${categories.details}`
}
const spinner = isLoding => {
    const loadSection = document.getElementById('spinner');
    if (isLoding) {
        loadSection.classList.remove('d-none');
    }
    else {
        loadSection.classList.add('d-none');
    }
}

loadCategory()
