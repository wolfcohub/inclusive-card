/*
 * See: https://inclusive-components.design/cards/ for why this is
 * needed/recommended.
 */
export default class InclusiveCard extends HTMLElement {
  private _clickStart: Date | undefined;
  private _exclusionSelector: string | null;
  private _linkSelector: string | null;
  private _link: HTMLAnchorElement | null;

  constructor() {
    super();

    this._clickStart = undefined;
    this._exclusionSelector = this.getAttribute('exclusions');
    this._link = null;
    this._linkSelector = this.getAttribute('link-target');
  }

  connectedCallback() {
    this.createChildren().enable();
  }

  createChildren() {
    this._link = this._linkSelector
      ? this.querySelector(this._linkSelector)
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

  handleMouseDown = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (this._exclusionSelector) {
      if (target.matches(this._exclusionSelector)) {
        event.stopPropagation();

        return;
      }
    }

    this._clickStart = new Date();
  };

  handleMouseUp = (event: MouseEvent) => {
    const upStamp = new Date();
    const target = event.target as HTMLElement;
    if (this._exclusionSelector) {
      if (target.matches(this._exclusionSelector)) {
        event.stopPropagation();

        return;
      }
    }

    if (upStamp.getTime() - this._clickStart!.getTime() < 200) {
      // Avoid double firing click events
      if (this._link !== event.target) {
        this._link!.click();
      }
    }
  };
}
