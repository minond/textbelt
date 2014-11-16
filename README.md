[![Build Status](https://travis-ci.org/minond/textbelt.svg?branch=master)](https://travis-ci.org/minond/textbelt)
[![Coverage Status](https://coveralls.io/repos/minond/textbelt/badge.png)](https://coveralls.io/r/minond/textbelt)

`textbelt` allows you to use [TextBelt](http://textbelt.com/) in Node.js:

```js
textbelt('8011231234', 'hi man, how are you??' /*, callback */);
```

#### limitations

there's no way to send internaltional messages or messages to Canada, which
TextBelt does support. I just hardcoded the `text` end-point in the code.
see the [TextBelt](http://textbelt.com/) site for service limitations.

#### thanks

thanks for [Ian Webster](https://github.com/typpo) for creating
[TextBelt](https://github.com/typpo/textbelt)

#### notes

won't be uploading this package to npm since
[TextBelt](https://github.com/typpo/textbelt) can already programmatically
used as a node package.
