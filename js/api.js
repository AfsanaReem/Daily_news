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
                <a class="nav-link text-muted" href="#">${category.category_name}</a>
            </li>
        `
        categoryContainer.appendChild(categoryUl);
        console.log(category.category_name)
    });
    // categoryContainer.document.
}
loadCategory();