const homePage = () => location.href = 'http://localhost:8000/';

function renderState(route) {
  window.scrollTo(0, 0);

  const article = document.querySelector('article');
  if (!article) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');
    const nav = document.querySelector('nav');
    nav.style.display = 'none';

    const article = document.createElement('article');
    document.querySelector('main').appendChild(article);
  }

  fetch('chapters/' + route + '.txt')
    .then(response => {
      if (response.status == 200) {
        return response.text()
      } else {
        return homePage();
      }
    })
    .then(content => {
      document.querySelector('article').innerHTML = content;
      document.title = 'Quantised - ' + route;
    })
    .catch(error => console.log(error));
}

if (location.hash) {
  const route = location.hash.slice(1).replaceAll('%20', ' ');
  renderState(route);
}

window.addEventListener('hashchange', () => {
  const route = location.hash.slice(1).replaceAll('%20', ' ');
  return renderState(route);
});

window.addEventListener('popstate', () => {
  const route = location.hash.slice(1).replaceAll('%20', ' ');
  if (route) {
    return renderState(route);
  } else {
    return homePage();
  }
});
