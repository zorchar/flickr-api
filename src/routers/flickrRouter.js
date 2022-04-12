const express = require('express')
const flickr = require('../utils/flickr')

const router = express.Router()

router.get('/flickr/:images', async (req, res) => {
    let text = req.params.images

    if (req.params.images === 'interestingness') {
        text = undefined
    }
    try {
        const photosData = await flickr(text)
        let photosInHTML = ""
        let photos = []
        // if (photosData.isArray) {
        photosData.forEach((el, index) => {
            photosInHTML += `<img src="${el}" alt="">`
            photos.push(el)
        })
        res.send(photos)
        // }
        // else {
        //     res.send(`<h1>${photosData.message}</h1>`)

        // }
    } catch (error) {
        if (error.status === 404) {
            res.status(404).send(error)
        }
    }
})

module.exports = router