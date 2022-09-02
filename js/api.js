const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}
const displayCategory = categories => {
    const categoryContainer = document.getElementById('categoryContainer');
    categories.forEach(category => {
        const categoryUl = document.createElement('ul')
        categoryUl.classList.add('nav-tabs');
        categoryUl.classList.add('nav');
        categoryUl.classList.add('flex-fill');
        categoryUl.innerHTML = `
            <li class="nav-item">
                <a class="nav-link text-muted" onclick="loadCategoryNews('${category.category_id}')" href="#">${category.category_name}</a>
            </li>
        `
        categoryContainer.appendChild(categoryUl);
    });
}
const loadCategoryNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryNews(data.data);
    console.log(data.data);
}
const displayCategoryNews = newsArray => {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = `<p> ${newsArray.length} items found </p>`;
    newsArray.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-2">
                            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-10">
                            <div class="card-body">
                                <h5 class="card-title">${news.title}</h5>
                                <p class="card-text">${news.details}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="d-flex">
                                        <img style="width: 50px;" class="rounded-circle" src="${news.author.img}" alt="">
                                        <p>${news.author.name ? news.author.name : 'No author'}<br>${news.author.published_date ? news.author.published_date : 'No date found'}</p>
                                    </div>
                                    <p>Total View: ${news.total_view ? news.total_view : 'No views'}</p>
                                    <button type="button" class="btn btn-outline-info">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        newsContainer.appendChild(newsDiv);
    })

}
loadCategory();