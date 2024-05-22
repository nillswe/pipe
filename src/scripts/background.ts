///<reference types="chrome"/>
// @ts-ignore
import init from '@/scripts/init?script'

chrome.action.onClicked.addListener(async tab => {
  if (!tab.id) return

  await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: [init],
  })
})
