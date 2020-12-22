const homePage = () => location.href = 'https://artaurus.github.io/quantised/';

function redesign(header) {
  const displace = '20vh';
  header.style.alignItems = 'center';
  header.style.height = displace;
  header.style.background = '#fff';
  header.style.zIndex = '2';

  if (window.innerWidth > 1120) {
    document.querySelector('h1').style.fontSize = '3.5rem';
  }
  document.querySelector('main').style.top = displace;
}

function colorTile(index) {
  let color = '';
  switch (index % 3) {
    case 0:
      color = '#800080';
      break;
    case 1:
      color = '#222';
      break;
    case 2:
      color = '#008080';
  }
  return color;
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
  const route = location.hash.slice(1).replaceAll('%20', ' ');
  renderState(route);
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
