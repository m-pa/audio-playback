const { sounds } = require('../../index')

async function main () {
  const soundObjects = await sounds(['powerpad.wav'])
  soundObjects.map((sound) => {
    sound.bufferNode.start(0)
  })

  setTimeout(() => soundObjects.map(sound => sound.gainNode.gain.value = .1), 3000)
}

main()