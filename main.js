const homePage = () => location.href = 'https://artaurus.github.io/quantised/';

const getRoute = () => location.hash.slice(1).replaceAll('%20', ' ');

function waves() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const canvas = document.getElementById('canvas');
  canvas.width = w;
  canvas.height = 0.16*h;
  const mid = 0.08*h;
  const ctx = canvas.getContext('2d');

  let phase = 0;
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let y1 = [], y2 = [];
    for(x = 0; x < w; x++) {
      y1[x] = 0.05 * h * Math.sin(0.01 * (x - 2*phase));
      y2[x] = 0.05 * h * Math.cos(0.01 * (x + phase));
    }
    ctx.beginPath();
    for(x = 0; x < w; x++) {
      ctx.moveTo(x, mid + y1[x]);
      ctx.lineTo(x+1, mid + y1[x+1]);
      ctx.moveTo(x, mid + y2[x]);
      ctx.lineTo(x+1, mid + y2[x+1]);
    }
    ctx.strokeStyle = '#777';
    ctx.stroke();
    phase += 2;
  }, 10);
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
    document.querySelector('canvas').style.display = 'none';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');
    document.querySelector('nav').style.display = 'none';

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

  const anchors = Array.from(document.querySelectorAll('h2 a'));
  const routes = anchors.map(anchor => anchor.innerText);
  const i = routes.findIndex(item => item == route.toUpperCase());
  header.style.borderBottom = colorTile(i) + ' solid 4vh';
  header.style.position = 'fixed';
  header.style.zIndex = 1;

  const main = document.querySelector('main');
  main.style.position = 'relative';
  main.style.top = '20vh';
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

  waves();
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
