export const WORD_STYLES = {
  plain: '',
  accent: 'text-accent',
  outline: 'text-outline',
}

export function parseMarked(text) {
  const segments = text.split(/(\*[^*]+\*|~[^~]+~)/g).filter(Boolean)
  const words = []
  let prevEndedWithSpace = true

  for (const segment of segments) {
    let style = 'plain'
    let content = segment
    if (segment.startsWith('*')) {
      style = 'accent'
      content = segment.slice(1, -1)
    } else if (segment.startsWith('~')) {
      style = 'outline'
      content = segment.slice(1, -1)
    }

    const parts = content.split(/\s+/).filter(Boolean)
    const startsWithSpace = /^\s/.test(content)

    parts.forEach((word, index) => {
      if (index === 0 && !startsWithSpace && !prevEndedWithSpace && words.length) {
        words[words.length - 1].word += word
      } else {
        words.push({ word, style })
      }
    })

    prevEndedWithSpace = /\s$/.test(content)
  }

  return words
}

export const stripMarks = (text) => text.replace(/[*~]/g, '')
