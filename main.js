const homepage = () => location.href = 'https://artaurus.github.io/quantised/';

const getRoute = () => location.hash.slice(1).replaceAll('%20', ' ');

function waves() {
  // canvas dimensions
  const w = window.innerWidth;
  const h = window.innerHeight;
  const canvas = document.querySelector('canvas');
  canvas.width = w;
  canvas.height = 0.16*h;
  const mid = 0.08*h;
  const ctx = canvas.getContext('2d');

  // waves animation
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
  // chapter colours
  switch (index % 3) {
    case 0:
      return '#222';
    case 1:
      return '#700070';
    case 2:
      return '#007070';
  }
}

function toggleMenu(arrow, menu, toggle) {
  if (toggle) {
    arrow.src = 'images/down.png';
    menu.style.display = 'none';
    return 0;
  } else {
    arrow.src = 'images/up.png';
    menu.style.display = 'block';
    return 1;
  }
}

function renderState(route) {
  window.scrollTo(0, 0);

  // list routes
  const anchors = Array.from(document.querySelectorAll('h2 a'));
  const routes = anchors.map(anchor => anchor.getAttribute('href').slice(1));

  if (!document.querySelector('article')) {
    // clear homepage content
    document.querySelector('canvas').style.display = 'none';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');
    document.querySelector('nav').style.display = 'none';

    const main = document.querySelector('main');
    // add menu button
    const arrow = document.createElement('img');
    arrow.id = 'menu-button';
    arrow.src = 'images/down.png';
    main.appendChild(arrow);

    // add menu
    const menu = document.createElement('ul');
    menu.id = 'menu';
    routes.forEach(item => {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.href = '#' + item;
      a.innerText = item;
      li.append(a);
      menu.append(li);
    });
    main.appendChild(menu);

    // add article
    const article = document.createElement('article');
    main.appendChild(article);
  }

  // fetch chapter content
  fetch('chapters/' + route + '.html')
    .then(response => {
      if (response.status == 200) {
        return response.text();
      } else {
        return homepage();
      }
    })
    .then(html => {
      // modify header
      const i = routes.findIndex(item => item == route);
      const header = document.querySelector('header');
      header.style.borderBottom = colorTile(i) + ' solid 4vh';
      header.style.position = 'fixed';
      header.style.zIndex = 1;

      // adjust main
      const main = document.querySelector('main');
      main.style.position = 'relative';
      main.style.top = '20vh';

      // fill article
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const article = document.querySelector('article');
      article.innerHTML = doc.body.innerHTML;
      document.title = 'Quantised - ' + route;

      // toggle menu
      const arrow = document.getElementById('menu-button');
      const menu = document.getElementById('menu');
      let toggle = toggleMenu(arrow, menu, 1);
      arrow.addEventListener('click', () => {
        toggle = toggleMenu(arrow, menu, toggle);
        if (window.innerWidth < 768) {
          if (toggle) {
            article.innerHTML = '<h2>Chapters</h2>';
          } else {
            article.innerHTML = doc.body.innerHTML;
          }
        }
      });
    })
    .catch(error => console.log(error));
}

// on page load
if (location.hash) {
  renderState(getRoute());
} else {
  waves();

  const content = Array.from(document.querySelectorAll('.nav-content'));
  content.forEach((para, i) => {
    if (i % 2) {
      para.style.textAlign = 'right';
    }
  });
  const tiles = Array.from(document.querySelectorAll('.nav-tile'));
  tiles.forEach((tile, i) => tile.style.backgroundColor = colorTile(i));
}

// client-side routing
window.addEventListener('hashchange', () => renderState(getRoute()));

// browser navigation
window.addEventListener('popstate', () => {
  const route = getRoute();
  if (route) {
    return renderState(route);
  } else {
    return homepage();
  }
});

// refresh when rotated
window.addEventListener('orientationchange', () => location.reload());
