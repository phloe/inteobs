# inteobs

> A [ponyfill](https://ponyfill.com/) based on the [w3c/IntersectionObserver](https://github.com/w3c/IntersectionObserver) polyfill

This module will help you get to use the goodness of [Intersection Observer](https://w3c.github.io/IntersectionObserver/) without affecting builtins.

The name is a playful contraction on Intersection Observer to __inte-obs__ [ˈɪnˌtɛ-əbz] (first part in swedish meaning __not__ - and then "obs" - so "not-observer").

### Install

```
npm install inteobs
```

### Usage

The default export of the package is either a reference to the native `window.IntersectionObserver` - or a js implementation of it:

```
import IntersectionObserver from "inteobs";
```

The js implementation is also exposed as a named export `IntersectionObserver`:

```
import { IntersectionObserver } from "inteobs";
```

### Caveats

One difference between this module and the official polyfill is that - due to being a ponyfill - [a missing property in Edge 15](https://github.com/w3c/IntersectionObserver/issues/211) (`isIntersecting`) cannot be patched.
However - the property in question is not at all essential for Intersection Observer to work (it can be worked around).

### Credits

This module basically just exposes a repackaged [w3c/IntersectionObserver](https://github.com/w3c/IntersectionObserver) - so any credit really has go to the great work done by its contributors :)
