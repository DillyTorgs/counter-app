import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class CounterApp extends DDDSuper(LitElement) {
  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.counter = 0;
    this.min = 10;
    this.max = 25;
    this.counterColor = 'white'; 
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number },
      counterColor: { type: String } 
    };
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      this.updateCounterColor();
      this.makeItRain();
    }
  }

  updateCounterColor() {
    if (this.counter === this.min || this.counter === this.max) {
      this.counterColor = 'red'; 
    } else if (this.counter === 18) {
      this.counterColor = 'orange'; 
    } else if (this.counter === 21) {
      this.counterColor = 'purple'; 
    } else {
      this.counterColor = 'black'; 
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-default-navy80);
        background-color: var(--ddd-theme-default-navy80);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        text-align: center;
      }
      button {
        margin: 5px;
        padding: 10px 15px;
      }
    `];
  }

  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="title">${this.title}</div>
        <h1 class="counter" style="color: ${this.counterColor}">${this.counter}</h1>
        <div>
          <button @click="${this.increment}" ?disabled="${this.max === this.counter}">+</button>
          <button @click="${this.decrement}" ?disabled="${this.min === this.counter}">-</button>
        </div>
        <confetti-container id="confetti"></confetti-container>
        <slot></slot>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);


