import { html, LitElement } from "lit"

class SpotlightCards extends LitElement {
  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this._injectStyles()
    this._boundMouseMove = this._handleMouseMove.bind(this)
    document.addEventListener('mousemove', this._boundMouseMove)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('mousemove', this._boundMouseMove)
  }

  _injectStyles() {
    const styleId = 'spotlight-cards-styles'
    if (document.getElementById(styleId)) return

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      .spotlight-card {
        --mouse-x: 50%;
        --mouse-y: 50%;
        --spotlight-color: rgba(255, 255, 255, 0.8);
        --spotlight-size: 150px;
        position: relative;
        border-radius: 0.5rem;
        overflow: hidden;
        isolation: isolate;
      }

      .spotlight-card::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1px;
        background: radial-gradient(
          var(--spotlight-size) circle at var(--mouse-x) var(--mouse-y),
          var(--spotlight-color),
          transparent 100%
        );
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        z-index: -1;
      }
    `
    document.head.appendChild(style)
  }

  _handleMouseMove(e) {
    const cards = this.querySelectorAll('.spotlight-card')
    cards.forEach(card => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    })
  }

  render() {
    return html`<slot></slot>`
  }
}

customElements.define("spotlight-cards", SpotlightCards)
