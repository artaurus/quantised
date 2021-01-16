const homePage = () => location.href = 'https://artaurus.github.io/quantised/';

const getRoute = () => location.hash.slice(1).replaceAll('%20', ' ');

function redesign(header) {
  header.style.alignItems = 'center';
  header.style.background = '#fff';
  header.style.zIndex = '2';

  if (window.innerWidth > 1120) {
    header.style.height = '20vh';
    document.querySelector('h1').style.fontSize = '3.5rem';
    document.querySelector('main').style.top = '20vh';
  }
}

function colorTile(index) {
  switch (index % 3) {
    case 0:
      return '#222';
    case 1:
      return '#700070';
    case 2:
      return '#007070';
  }
}

function renderState(route) {
  window.scrollTo(0, 0);

  const header = document.querySelector('header');
  if (!document.querySelector('article')) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');
    const nav = document.querySelector('nav');
    nav.style.display = 'none';

    const article = document.createElement('article');
    document.querySelector('main').appendChild(article);

    redesign(header);
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

    const anchors = Array.from(document.querySelectorAll('h2 a'));
    const routes = anchors.map(anchor => anchor.innerText);
    const i = routes.findIndex(item => item == route.toUpperCase());
    header.style.borderBottom = colorTile(i) + ' solid 4vh';
}

if (location.hash) {
  renderState(getRoute());
} else {
  const content = Array.from(document.querySelectorAll('.nav-content'));
  content.forEach((para, i) => {
    if (i % 2) {
      para.style.textAlign = 'right';
    }
  });
  const tiles = Array.from(document.querySelectorAll('.nav-tile'));
  tiles.forEach((tile, i) => tile.style.backgroundColor = colorTile(i));
}

window.addEventListener('hashchange', () => renderState(getRoute()));

window.addEventListener('popstate', () => {
  const route = getRoute();
  if (route) {
    return renderState(route);
  } else {
    return homePage();
  }
});
