const homePage = () => location.href = 'https://artaurus.github.io/quantised/';

function renderState(route) {
  const anchor = Array.from(document.querySelectorAll('nav ul li a'));
  const state = anchor.filter(a => a.innerHTML == route)[0];
  if (!state) {
    return homePage();
  }

  fetch('chapters/' + route + '.txt')
    .then(response => response.text())
    .then(content => {
      document.querySelector('h3').innerHTML = route;
      document.querySelector('p').innerHTML = content;
    })
    .catch(error => console.log(error));
  document.title = 'Quantised - ' + route;

  let old = document.querySelector('#active');
  if (old) {
    old.id = '';
  }
  state.id = 'active';
  old = state;
  window.scrollTo(0, 0);
}

if (window.innerWidth < 480) {
  const main = document.querySelector('main');
  const first = main.firstElementChild;
  main.removeChild(first);
  main.appendChild(first);
}

const routes = ['Introduction', 'Wave-Particle Duality', 'Transformation Theory', 'Uncertainty', 'Spin', 'Antiparticles', 'Entanglement', 'Interpretations', 'Measurement'];

const ul = document.querySelector('ul');
routes.forEach(route => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = '#' + route.replaceAll(' ', '%20');
  const text = document.createTextNode(route);
  a.appendChild(text);
  li.appendChild(a);
  ul.appendChild(li);
});

if (location.hash) {
  const route = location.hash.slice(1).replaceAll('%20', ' ');
  renderState(route);
}

window.addEventListener('popstate', () => {
  const route = location.hash.slice(1).replaceAll('%20', ' ');
  if (route) {
    return renderState(route);
  } else {
    return homePage();
  }
});

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
  return '';
});

window.addEventListener('orientationchange', () => location.reload());
