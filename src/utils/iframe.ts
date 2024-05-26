export const getIframeHref = (iframe: HTMLIFrameElement): string => {
  return iframe.contentWindow?.location.href || ''
}

export const getIframeBody = (
  iframe: HTMLIFrameElement,
): HTMLElement | undefined => {
  return iframe.contentDocument?.body
}
