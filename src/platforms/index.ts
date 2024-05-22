import {PLATFORM_OPTIONS} from '@/domain/enums'

export const getPlatform = () => {
  if (chrome) {
    return PLATFORM_OPTIONS.chrome
  }

  return PLATFORM_OPTIONS.webApp
}

export const isChrome = () => getPlatform() === PLATFORM_OPTIONS.chrome
export const isWebApp = () => getPlatform() === PLATFORM_OPTIONS.webApp
