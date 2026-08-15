document.querySelector('#signup-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email');
  document.querySelector('#form-message').textContent = `Thanks — we’ll save a little wonder for ${email.value}.`;
  email.value = '';
});

const starTalk = document.querySelector('#startalk-video');
starTalk.src += `&index=${Math.floor(Math.random() * 140)}`;

const setNewsCard = (id, article, label) => {
  const card = document.querySelector(id);
  card.href = article.url;
  card.querySelector('strong').textContent = article.title;
  card.querySelector('small').textContent = label;
};

const loadLiveNews = async () => {
  try {
    const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=1&ordering=-published_at');
    const data = await response.json();
    const article = data.results[0];
    setNewsCard('#space-news', article, `${article.news_site} · latest update`);
  } catch { document.querySelector('#space-news small').textContent = 'Live feed is temporarily unavailable'; }
  try {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const stories = await response.json();
    const id = stories[Math.floor(Math.random() * 25)];
    const item = await (await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)).json();
    setNewsCard('#tech-news', { title: item.title, url: item.url || `https://news.ycombinator.com/item?id=${item.id}` }, 'Trending now on Hacker News');
  } catch { document.querySelector('#tech-news small').textContent = 'Live feed is temporarily unavailable'; }
};
loadLiveNews();
