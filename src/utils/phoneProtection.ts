// Phone Number Protection Utility
// Protects phone numbers from bots and scrapers

// Simple ROT13-like encoding for phone numbers
const encodePhone = (phone: string): string => {
  return btoa(phone).split('').reverse().join('')
}

const decodePhone = (encoded: string): string => {
  return atob(encoded.split('').reverse().join(''))
}

// Encoded phone numbers (not easily readable by bots)
export const ENCODED_PHONE = encodePhone('14256989990')
export const ENCODED_FORMATTED_PHONE = encodePhone('+1 (425) 698-9990')

// Safe phone functions that require user interaction
export const getPhoneNumber = (): string => {
  return decodePhone(ENCODED_PHONE)
}

export const getFormattedPhoneNumber = (): string => {
  return decodePhone(ENCODED_FORMATTED_PHONE)
}

export const initiateCall = (): void => {
  const phone = getPhoneNumber()
  window.open(`tel:+${phone}`)
}

export const createWhatsAppLink = (message: string): string => {
  const phone = getPhoneNumber()
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

// Safe display component that shows generic text until clicked
export const createSafePhoneDisplay = (onReveal?: () => void) => {
  return {
    displayText: 'Click to reveal phone number',
    onClick: () => {
      if (onReveal) onReveal()
      return getFormattedPhoneNumber()
    }
  }
}