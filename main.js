function flipSequence() {
  const main = document.querySelector('main');
  const first = main.firstElementChild;
  main.removeChild(first);
  main.appendChild(first);
}

function homePage() {
  location.href = 'https://artaurus.github.io/quantised/';
}

function renderState(state, data) {
  const h3 = document.querySelector('h3');
  const para = document.querySelector('p');
  data.forEach(elm => {
    if (elm.title == state.id) {
      h3.innerHTML = elm.title;
      para.innerHTML = elm.content;
    }
  });

  let old = document.querySelector('.active');
  if (old != null) {
    old.className = '';
  }
  state.className = 'active';
  old = state;
  window.scrollTo(0, 0);
}

function handler(data) {
  const ul = document.querySelector('ul');
  data.forEach(elm => {
    const li = document.createElement('li');
    const text = document.createTextNode(elm.title);
    li.appendChild(text);
    ul.appendChild(li);
  });

  document.querySelector('h1').addEventListener('click', () => homePage());
  li = document.querySelectorAll('nav ul li');
  li.forEach(state => {
    state.id = state.innerHTML;
    state.addEventListener('click', () => renderState(state, data));
  });
}

if (window.innerWidth < 480) {
  flipSequence();
}
window.addEventListener('orientationchange', () => flipSequence());

fetch('chapters.json')
  .then(res => res.json())
  .then(data => handler(data))
  .catch(err => console.log(err));
