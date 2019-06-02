const fs = require('fs')
const { AudioContext } = require('web-audio-api')
const Speaker = require('speaker')
const context = new AudioContext
const path = require('path')

function getSounds (paths) {
  try {
    return paths.map((file) => ({
      buffer: fs.readFileSync(path.resolve(process.cwd(), file)),
      name: file.split('.')[0]
    }))
  } catch (err) {
    console.error("There was an error loading the sound files: ", err)
  }
}

async function sounds (arr) {
  if (!arr) {
    throw new Error('You didn\'t provide an array of soundfile paths as an argument.')
  }
  context.outStream = new Speaker({
    channels: context.format.numberOfChannels,
    bitDepth: context.format.bitDepth,
    sampleRate: context.sampleRate,
  })

  let sounds = getSounds(arr)
  sounds = sounds.map(async (sound) => await initSound(sound))
  sounds = await Promise.all(sounds)
  return sounds
}

async function initSound(sound) {
  return new Promise((resolve, reject) => {
    try {
      context.decodeAudioData(sound.buffer, function(audioBuffer) {
        const bufferNode = context.createBufferSource()
        const gainNode = context.createGain()
        bufferNode.connect(gainNode)
        gainNode.connect(context.destination)
        bufferNode.buffer = audioBuffer
        bufferNode.loop = true
        bufferNode.on('end', () => bufferNode.start(0))
        resolve({
          gainNode,
          bufferNode,
          name: sound.name
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  sounds
}