const removeAttributes = (element: HTMLElement) => {
  Object.values(element.attributes).forEach(attribute => {
    element.removeAttribute(attribute.name)
  })
}

const clearPageContent = () => {
  const children = document.documentElement.children

  for (let i = 0; i < children.length; i++) {
    const element = children[i]
    if (['head', 'body'].includes(element.tagName) && element.parentNode) {
      element.parentNode.removeChild(element)
    }
  }

  const style = document.createElement('link')
  style.rel = 'stylesheet'
  style.type = 'text/css'
  style.href = chrome.runtime.getURL('reactMain-D7lzuqIG.css')

  document.head.innerHTML = ''
  document.head.appendChild(style)
  document.body.innerHTML = ''

  removeAttributes(document.body)
  removeAttributes(document.documentElement)

  const appRoot = document.createElement('div')

  appRoot.id = 'PIPE-ROOT'

  document.body.appendChild(appRoot)
}
clearPageContent()
