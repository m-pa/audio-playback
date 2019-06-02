# audio-playback

a nodejs library that wraps web-audio-api and speaker and simplifies their interfaces.
As a drawback Streamsound has limited versatility.
Just give it an array of wav soundfile paths and you will get an array of objects with methods available on the sound stream.

## Usage

Add this repo to your package json as dependancy and `yarn`.

then

``` index.js
  const { sounds } = require('../../index')

  async function main () {
    const soundObjects = await sounds(['Tribal.wav'])
    soundObjects.map((sound) => {
      sound.bufferNode.start(0)
      sound.gainNode.gain.value =  0.5
    })
  }

  main()
```

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

