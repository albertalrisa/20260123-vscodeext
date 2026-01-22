import { html, LitElement } from "lit"

class EditorLogos extends LitElement {
  // Define your logos here - add/remove as needed
  logos = [
    { src: "./assets/vscodium.svg", alt: "VSCodium" },
    { src: "./assets/vscode.svg", alt: "Visual Studio Code" },
    { src: "./assets/cursor.svg", alt: "Cursor" },
    { src: "./assets/antigravity.png", alt: "Antigravity" },
    { src: "./assets/kiro.svg", alt: "Kiro" },
  ]

  // Duration per item in seconds
  itemDuration = 2

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this._injectStyles()
  }

  _injectStyles() {
    const styleId = 'editor-logos-styles'
    const existingStyle = document.getElementById(styleId)
    if (existingStyle) existingStyle.remove()

    const count = this.logos.length
    const totalDuration = count * this.itemDuration
    const holdRatio = 0.6 // 60% of each step is holding, 40% is scrolling

    // Each item is 1/3 of visible area (showing 3 at a time)
    // Container has (count * 2) items for seamless loop
    // Total container height = (count * 2) / 3 * 100% of visible area
    // Each item in container = 100 / (count * 2) % of container
    // Moving one item up = translateY by (100 / (count * 2))%
    const itemPercent = 100 / (count * 2)

    // Build keyframes dynamically
    let keyframes = ''
    for (let i = 0; i < count; i++) {
      const stepStart = (i / count) * 100
      const holdEnd = stepStart + (100 / count) * holdRatio
      const translateY = i * itemPercent

      keyframes += `${stepStart}%, ${holdEnd}% { transform: translateY(-${translateY}%); }\n`
    }
    // Final position - scroll to the duplicate of first item for seamless loop
    keyframes += `100% { transform: translateY(-${count * itemPercent}%); }\n`

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes scroll-up {
        ${keyframes}
      }
      .scroll-container {
        animation: scroll-up ${totalDuration}s ease-in-out infinite;
      }
    `
    document.head.appendChild(style)
  }

  render() {
    // Duplicate logos for seamless loop
    const items = [...this.logos, ...this.logos]
    const totalItems = items.length
    // Container height: each item is 1/3 of visible, so total = totalItems / 3 * 100%
    const containerHeight = (totalItems / 3) * 100

    return html`
      <div
        class="inline-flex h-24 w-8 overflow-hidden relative isolate
            before:absolute before:w-full before:top-0 before:h-[33.34%] before:bg-linear-180 before:from-(--r-background-color) before:to-(--r-background-color)/0 before:z-10
            after:absolute after:w-full after:bottom-0 after:h-[33.34%] after:bg-linear-0 after:from-(--r-background-color) after:to-(--r-background-color)/0 after:z-10
        "
      >
        <div class="scroll-container w-full relative flex flex-col" style="height: ${containerHeight}%">
          ${items.map(
            (logo) => html`
              <img
                src="${logo.src}"
                alt="${logo.alt}"
                class="full-image p-0.5 shrink-0"
                style="height: ${100 / totalItems}%"
              />
            `
          )}
        </div>
      </div>
    `
  }
}
customElements.define("editor-logos", EditorLogos)
