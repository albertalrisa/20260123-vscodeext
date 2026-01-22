import { createHighlighter } from 'shiki'

document.addEventListener("DOMContentLoaded", async () => {
  const theme = "vitesse-dark"

  const codefields = document.querySelectorAll("code.shiki")
  const highlighters = new Map()
  codefields.forEach(async (field) => {
    const lang = field.dataset.lang ?? 'js'

    let highlighter
    if (!highlighters.has(lang)) {
      highlighter = await createHighlighter({
        themes: [theme],
        langs: [lang],
      })
      highlighters.set(lang, highlighter)
    } else {
      highlighter = highlighters.get(lang)
    }

    const value = betterTrim(field.textContent)
    const formatted = highlighter.codeToHtml(value, {
      lang: lang,
      theme: theme,
    })
    field.innerHTML = formatted
  })
})

// Function to perform a better "data-trim" on code snippets
// Will slice an indentation amount on each line of the snippet (amount based on the line having the lowest indentation length)
function betterTrim(content) {
  // Helper functions
  function trimLeft(val) {
    // Adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
    return val.replace(/^[\s\uFEFF\xA0]+/g, "")
  }

  function trimLineBreaks(input) {
    var lines = input.split("\n")

    // Trim line-breaks from the beginning
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].trim() === "") {
        lines.splice(i--, 1)
      } else break
    }

    // Trim line-breaks from the end
    for (var i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim() === "") {
        lines.splice(i, 1)
      } else break
    }

    return lines.join("\n")
  }

  // Main function for betterTrim()
  return (function (content) {
    var lines = content.split("\n")
    // Calculate the minimum amount to remove on each line start of the snippet (can be 0)
    var pad = lines.reduce(function (acc, line) {
      if (
        line.length > 0 &&
        trimLeft(line).length > 0 &&
        acc > line.length - trimLeft(line).length
      ) {
        return line.length - trimLeft(line).length
      }
      return acc
    }, Number.POSITIVE_INFINITY)
    // Slice each line with this amount
    const sliced = lines
      .map(function (line) {
        return line.slice(pad)
      })
	const startSlice = sliced.findIndex((v) => v.length > 0)
	const endSlice = sliced.findLastIndex((v) => v.length > 0)
	return sliced.slice(startSlice, endSlice + 1)
      .join("\n")
  })(content)
}
