const removeAttributes = (element: HTMLElement) => {
  Object.values(element.attributes).forEach(attribute => {
    element.removeAttribute(attribute.name)
  })
}

const clearPageContent = () => {
  document.head.innerHTML = ''
  document.body.innerHTML = ''

  removeAttributes(document.body)
  removeAttributes(document.documentElement)

  const appRoot = document.createElement('div')

  appRoot.id = 'PIPE-ROOT'

  document.body.appendChild(appRoot)
}

clearPageContent()
