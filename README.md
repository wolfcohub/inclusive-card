# Inclusive Card

A web component to make linked cards friendlier to assistive technologies (e.g., screen readers).

## Rationale

This web component is inspired by and directly emulates the [card component](https://inclusive-components.design/cards/)
proposed in Heydon
Pickering's [collection of Inclusive Components](https://inclusive-components.design/).

A traditional approach to card layouts that have a call to action in them is to wrap the entire layout in an anchor
element, which is something that HTML5 made possible. However, when a screen reader (for example) encounters that
layout, it will more often than not read the entirety of whatever is enclosed by the anchor element as the "content" of
the anchor itself. This could include the full URL to an image in the card, a text summary, and anything else one might
put in their card layouts.

This component attempts to remedy that by allowing an author to write sensible markup that isn't wrapped in an anchor
element. A card that needs to be linked can have an independent anchor in the its contents. The component adds a small
amount of JavaScript to send click events on the card itself to the destination specified in the `href` attribute of a
given link within the card.

## Installation and Usage

`npm install @wolfco/inclusive-card`

`import 'inclusive-card';`

```
<inclusive-card>
  <article link-target="[data-card-link]">
    <img src="foo" alt="foo" />
    <h1>Article Title</h1>
    <p>Article summary...</p>
    <a data-card-link href="/foo">Learn more about foo</a>
  </article>
</inclusive-card>
```

### Attributes

The component has a single attribute `link-target`, which is a string representing a CSS selector meant to identify the
anchor to derive an `href` from. Any valid CSS selector will work. For example:
`link-target="[data-card-link]"` or `link-target="div > .link"`.
