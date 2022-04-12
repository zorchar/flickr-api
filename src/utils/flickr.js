const axios = require('axios')

const flickr = async (text) => {
    const method = typeof text !== 'string' ? 'flickr.interestingness.getList' : 'flickr.photos.search'

    const token = process.env.FLICKR_TOKEN
    const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${token}` + (typeof text === 'string' ? ('&text=' + text) : ``) + `&extras=url_m&format=json&nojsoncallback=1`

    try {
        const result = await axios.get(url)
        const data = result.data?.photos?.photo;

        if (data.length > 0 && result.status === 200) {
            const photos = []
            for (let photo of data) {
                photos.push(photo.url_m)
            }

            return photos
        }
        else if (result.data.stat === 'ok') {
            console.log('error1');
            return {
                message: 'no images found'
            }
        }
        else {
            return {
                code: result.data.code,
                message: result.data.message
            }
        }
    } catch (error) {
        throw error
    }
}

// flickr('dafhgsrjrytukdgae')
//     .then((res) => {
//         console.log(res);
//     }).catch((error) => {
//         console.log(error);
//     })

module.exports = flickr

