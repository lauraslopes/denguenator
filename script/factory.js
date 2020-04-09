const enemyFactory = (type, attributes, ...children) => {
  const el = document.createElement(type)

  for (key in attributes) {
    el.setAttribute(key, attributes[key])
  }

  children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child))
    } else {
      el.appendChild(child)
    }
  })

  return el
}
var i;
for (i = 0; i < 5; i++){
  const markup = elFactory(
    'div',
    { class: 'dengue', id: 'dengue'+i },
    elFactory('img', {src: 'dengue.png', ondragstart:'return false'}, '')
    )

    document.body.appendChild(markup)
}
