const path = require('path')
const fs = require('fs')
const cheerio = require('cheerio')
const request = require('request')
const phantom = require('phantom')

function downloader(inputs) {
  inputs.forEach((input, index) => {
    if (input.indexOf('miaopai.com') === -1) {
      console.log('incorrent url!!!')
      return
    }

    (async function () {
      const instance = await phantom.create()
      const page = await instance.createPage()

      await page.on('onResourceRequested', requestData => {
        if (requestData.url === input) {
          console.info('Requesting', input)
        }
      })

      await page.open(input)

      const content = await page.property('content')

      const $ = cheerio.load(content)
      const url = $('.MIAOPAI_player .video').attr('src').split('?')[0]

      if (!fs.existsSync('videos')) {
        await fs.mkdir('videos', err => {
          if (err) {
            console.log('create directory fail')
            return
          }
        })
      }

      const stream = fs.createWriteStream(path.join('videos/', `${index + 1}.mp4`))

      console.log(`downloading ${url}`)

      request(url)
        .on('error', () => {
          console.log(`download of ${url} failed!`)
        })
        .pipe(stream)
        .on('finish', () => {
          console.log(`download of ${url} succeed!`)
        })

      await instance.exit()
    })()
  })
}

module.exports = downloader
