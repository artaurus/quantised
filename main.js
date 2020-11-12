function nav(data) {
  const ul = document.createElement('ul');
  data.forEach(item => {
    const li = document.createElement('li');
    const text = document.createTextNode(item.title);
    li.appendChild(text);
    ul.appendChild(li);
  });
  const nav = document.querySelector('nav');
  nav.appendChild(ul);
}

function content(title, data) {
  para = document.querySelector('p');
  data.forEach(item => {
    if (item.title == title) {
      para.innerHTML = item.content;
    };
  });
}

function handler(data) {
  nav(data);
  li = document.querySelectorAll('nav ul li');
  li.forEach(item => {
    item.addEventListener('click', () => content(item.innerHTML, data));
  });
}

fetch('chapters.json')
.then(res => res.json())
.then(data => handler(data))
.catch(err => console.log(err));
