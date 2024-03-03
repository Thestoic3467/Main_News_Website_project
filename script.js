const API_KEY = "8d2471a6b84c45f492b8f126a9844ef4";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

// Navbar on-click changes
function onNavItemClick(id) {
    fetchNews(id);
    
    // Remove 'active' class from previously active tag
    const prevActiveNav = document.querySelector('.nav-item.active');
    if (prevActiveNav) {
        prevActiveNav.classList.remove('active');
    }

    // Add 'active' class to the clicked tag
    const navItem = document.getElementById(id);
    navItem.classList.add('active');
}


async function fetchNews(query) {
    let subjectQuery = "";
     switch (query) {
        case "nutrition":
            subjectQuery = "nutrition India  OR child nutrition India  OR food security India  OR dietary habits India  OR malnutrition India ";
            break;
        case "health":
            subjectQuery = "public health India OR healthcare system India OR disease preventionIndia  OR health policies India OR medical research India ";
            break;
        case "education":
            subjectQuery = "education system OR educational reforms OR digital literacy OR school infrastructure OR teacher training ";
            break;
        case "community":
            subjectQuery = "community development OR social welfare programs OR rural empowerment India OR youth engagement OR volunteer initiative ";
            break;
        case "policies":
            subjectQuery = "Anganwadi Sevikas OR government policies OR welfare programs OR ICDS OR government policies OR social justice policies OR child welfare programs OR women's rights policies OR employment policies";
            break;
        default:
            subjectQuery = query; // If query doesn't match any specific subject, use it as is
            break;
    }

    const country = "in";
    const apiUrl = `https://newsapi.org/v2/everything?q=${subjectQuery}&country=${country}&apiKey=${API_KEY}`;
    const res = await fetch(`${url}${subjectQuery}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

// Define a function to fetch news articles at regular intervals
function fetchNewsPeriodically(query) {
    // Call fetchNews function to fetch news articles
    fetchNews(query);
    
    // Set up a timer to fetch news articles every X seconds (e.g., every 5 minutes)
    const intervalSeconds = 60; // 1 minute
    setInterval(() => {
        fetchNews(query);
    }, intervalSeconds * 1000); // Convert seconds to milliseconds
}

// Call fetchNewsPeriodically function on page load to start fetching news articles
window.addEventListener("load", () => fetchNewsPeriodically("India"));



function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});