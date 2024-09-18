/*
 * See: https://inclusive-components.design/cards/ for why this is
 * needed/recommended.
 */
export default class InclusiveCard extends HTMLElement {
  private _clickStart: Date | undefined;
  private _linkSelector: string | null;
  private _link: HTMLAnchorElement | null;

  constructor() {
    super();

    this._clickStart = undefined;
    this._link = null;
    this._linkSelector = this.getAttribute('link-target');
  }

  connectedCallback() {
    this.createChildren().enable();
  }

  createChildren() {
    this._link = this._linkSelector
      ? document.querySelector(this._linkSelector)
      : null;

    return this;
  }

  enable() {
    this.addEventListener('mousedown', this.handleMouseDown);

    this.addEventListener('mouseup', event => {
      this.handleMouseUp(event);
    });

    return this;
  }

  handleMouseDown = (): void => {
    this._clickStart = new Date();
  };

  handleMouseUp = (event: MouseEvent) => {
    const upStamp = new Date();
    if (upStamp.getTime() - this._clickStart!.getTime() < 200) {
      // Avoid double firing click events
      if (this._link !== event.target) {
        this._link!.click();
      }
    }
  };
}
