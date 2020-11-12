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

function article(title, data) {
  const para = document.querySelector('p');
  data.forEach(elm => {
    if (elm.title == title) {
      para.innerHTML = elm.content;
    }
  });
}

function handler(data) {
  nav(data);
  let flag = 0;
  li = document.querySelectorAll('nav ul li');
  let old = li[0];
  li.forEach(elm => {
    elm.addEventListener('click', () => {
      article(elm.innerHTML, data);
      old.className = '';
      elm.className = 'active';
      old = elm;
    });
  });
}

fetch('chapters.json')
  .then(res => res.json())
  .then(data => handler(data))
  .catch(err => console.log(err));

document.querySelector('h1').addEventListener('click', () => location.reload(false));
