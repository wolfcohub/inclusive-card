/*
 * See: https://inclusive-components.design/cards/ for why this is
 * needed/recommended.
 */
export default class InclusiveCard extends HTMLElement {
  private _clickStart: Date | undefined;
  private _exclusionSelector: string | null;
  private _exclusions: NodeListOf<HTMLAnchorElement> | null;
  private _linkSelector: string | null;
  private _link: HTMLAnchorElement | null;

  constructor() {
    super();

    this._clickStart = undefined;
    this._exclusionSelector = this.getAttribute('exclusions');
    this._exclusions = null;
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

    this._exclusions = this._exclusionSelector
      ? this.querySelectorAll(this._exclusionSelector)
      : null;

    return this;
  }

  enable() {
    this.addEventListener('mousedown', this.handleMouseDown);

    this.addEventListener('mouseup', event => {
      this.handleMouseUp(event);
    });

    this._exclusions!.forEach(exclusion => {
      exclusion.addEventListener('click', this.handleExclusionClick);
    });

    return this;
  }

  handleExclusionClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };

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
