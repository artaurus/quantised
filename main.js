function navBar(data) {
  data.forEach((item, i) => {
    const node = document.createElement('li')
    const textnode = document.createTextNode(item.title)
    node.appendChild(textnode)
    document.getElementById('nav').appendChild(node);
  });
}

function handler(data) {
  navBar(data);
}

fetch('./chapters.json')
.then(res => res.json())
.then(data => handler(data))
.catch(err => console.log(err));
