function homePage() {
  location.href = 'https://artaurus.github.io/quantised/';
  const active = document.querySelector('.active');
  if (active != null) {
    active.className = '';
  }
}

function navBar(data) {
  const ul = document.createElement('ul');
  data.forEach(elm => {
    const li = document.createElement('li');
    const text = document.createTextNode(elm.title);
    li.appendChild(text);
    ul.appendChild(li);
  });
  const nav = document.querySelector('nav');
  nav.appendChild(ul);
}

function renderState(li, data, update) {
  if (update) {
    history.pushState({}, '', '/quantised/' + li.innerHTML);
    const title = document.title.split(' - ');
    document.title = title[0] + ' - ' + li.innerHTML;
  }

  const h3 = document.querySelector('h3');
  const para = document.querySelector('p');
  data.forEach(elm => {
    if (elm.title == li.id) {
      h3.style.display = 'block';
      h3.innerHTML = elm.title;
      para.innerHTML = elm.content;
    }
  });

  let old = document.querySelector('.active');
  if (old != null) {
    old.className = '';
  }
  li.className = 'active';
  old = li;

  window.scrollTo(0, 0);
}

function handler(data) {
  navBar(data);

  document.querySelector('h1').addEventListener('click', () => homePage());
  li = document.querySelectorAll('nav ul li');
  li.forEach(elm => {
    elm.id = elm.innerHTML;
    elm.addEventListener('click', () => renderState(elm, data, true));
  });

  window.addEventListener('popstate', () => {
    const path = location.pathname.split('/');
    const route = path.pop().replace('%20', ' ');
    if (route != '') {
      elm = document.getElementById(route);
      renderState(elm, data, false);
    } else {
      homePage();
    }
  });
}

function sequence() {
  const main = document.querySelector('main');
  const first = document.querySelector('main:first-child');
  main.removeChild(first);
  main.appendChild(first);
}

if (window.innerWidth < 480) {
  sequence();
}

window.addEventListener('orientationchange', () => sequence());

if (location.pathname == '/quantised/') {
  document.querySelector('h3').style.display = 'none';
}

fetch('chapters.json')
  .then(res => res.json())
  .then(data => handler(data))
  .catch(err => console.log(err));
