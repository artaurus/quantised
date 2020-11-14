function homePage() {
  const url = location.href.split('/');
  url.pop();
  location.href = url.join('/');
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
    history.pushState({}, '', '/' + li.innerHTML);
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
    const extPath = location.pathname.split('/');
    const path = extPath.pop().replace('%20', ' ');
    if (path != 'quantised') {
      elm = document.getElementById(path);
      renderState(elm, data, false);
    } else {
      homePage();
    }
  });
}

if (window.innerWidth < 480) {
  main = document.querySelector('main');
  nav = document.querySelector('nav');
  main.removeChild(nav);
  main.appendChild(nav);
}

if (location.pathname == '/quantised') {
  document.querySelector('h3').style.display = 'none';
}

fetch('chapters.json')
  .then(res => res.json())
  .then(data => handler(data))
  .catch(err => console.log(err));
