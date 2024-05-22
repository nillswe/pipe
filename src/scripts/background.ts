///<reference types="chrome"/>
// @ts-ignore
import clearPageContent from '@/scripts/clear-page-content?script'
// @ts-ignore
import loadReactApp from '@/main?script'

chrome.action.onClicked.addListener(async tab => {
  if (!tab.id) return

  await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: [clearPageContent],
  })

  await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: [loadReactApp],
  })
})
