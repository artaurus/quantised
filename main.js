const homePage = () => location.href = 'https://artaurus.github.io/quantised';

function renderState(route) {
  const state = document.getElementById(route);
  if (state == null) {
    return homePage();
  }

  document.querySelector('h3').innerHTML = route;
  fetch('chapters/' + route + '.txt')
    .then(resp => resp.text())
    .then(content => {
      document.querySelector('p').innerHTML = content;
    })
    .catch(error => console.log(error));
  document.title = 'Quantised - ' + route;

  let old = document.querySelector('.active');
  if (old != null) {
    old.className = '';
  }
  state.className = 'active';
  old = state;
  window.scrollTo(0, 0);
}

function loadRoute() {
  if (location.hash != '') {
    const route = location.hash.slice(1).replace('%20', ' ');
    renderState(route);
  }
}

if (window.innerWidth < 480) {
  const main = document.querySelector('main');
  const first = main.firstElementChild;
  main.removeChild(first);
  main.appendChild(first);
}

const routes = ['Introduction', 'Formalism', 'Postulates', 'The atom', 'Symmetries', 'Entanglement'];

document.querySelector('h1').addEventListener('click', () => homePage());

const ul = document.querySelector('ul');
routes.forEach(route => {
  const li = document.createElement('li');
  const text = document.createTextNode(route);
  li.appendChild(text);
  li.id = route;
  ul.appendChild(li);

  li.addEventListener('click', () => {
    history.pushState({}, '', route);
    renderState(route);
  });
});

loadRoute();

window.addEventListener('popstate', () => {
  const route = location.pathname.split('/')[2].replace('%20', ' ');
  if (route != '') {
    renderState(route);
  } else {
    homePage();
  }
});

window.addEventListener('orientationchange', () => location.reload());
