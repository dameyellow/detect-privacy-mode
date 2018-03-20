# detect-privacy-mode

A front-end module for detection of Private Browsing / Incognito/ [Privacy Mode](https://en.wikipedia.org/wiki/Privacy_mode).

This module is inspired by 
[cou929's gist](https://gist.github.com/cou929/7973956) and [this Stackoverflow Thread](https://stackoverflow.com/questions/45721156/how-to-detect-private-browsing-in-ios-11-mobile-safari-or-macos-high-sierra-safa)

## Tested Browsers

* Chrome 65
* Firefox 59
* Internet Explorer 11, 10
* Edge 41.16299.248.0
* Safari 11 (iOS 11)

## Usage

```javascript
import detect from 'detect-privacy-mode'

// Callback
detect( is_private => {
  console.log("Browser is " + ( is_private ? "" : "not " ) + "private mode.")
});

// Promise
detect().then( is_private => {
  console.log("Browser is " + ( is_private ? "" : "not " ) + "private mode.")
});

// await
async function fn () {
  const is_private = await detect();
  console.log("Browser is " + ( is_private ? "" : "not " ) + "private mode.")
}
```

## License

MIT