function nav(data) {
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

function stateChange(li, data, update) {
  if (update) {
    history.pushState({}, '', '/' + li.innerHTML);
    const title = document.title.split(' - ');
    document.title = title[0] + ' - ' + li.innerHTML;
  }

  const para = document.querySelector('p');
  data.forEach(elm => {
    if (elm.title == li.innerHTML) {
      para.innerHTML = elm.content;
    }
  });

  let old = document.querySelector('.active');
  if (old != null) {
    old.className = '';
  }
  li.className = 'active';
  old = li;
}

function homePage() {
    const url = location.href.split('/');
    url.pop();
    location.href = url.join('/') + '/';
}

function handler(data) {
  nav(data);

  li = document.querySelectorAll('nav ul li');
  li.forEach(elm => {
    elm.id = elm.innerHTML;
    elm.addEventListener('click', () => stateChange(elm, data, true));
  });
  document.querySelector('h1').addEventListener('click', () => homePage());

  window.onpopstate = function() {
    path = location.pathname.slice(1).replace('%20', ' ');
    if (path != '') {
      elm = document.getElementById(path);
      stateChange(elm, data, false);
    } else {
      homePage();
    }
  };
}

fetch('chapters.json')
  .then(res => res.json())
  .then(data => handler(data))
  .catch(err => console.log(err));
