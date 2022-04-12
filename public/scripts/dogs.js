getDogs = async () => {
    const response = await fetch('http://localhost:3000/flickr/dog')
    return await response.json()
}

const putDogsIntoBody = async () => {
    const dogs = await getDogs()
    const container = document.getElementById('dogs-container')
    dogs.forEach(url => {
        container.append(createDogDiv(url))
    });
}

const createDogDiv = (url) => {
    const div = document.createElement('div')
    const img = document.createElement('img')
    img.src = url
    div.append(img)
    return div
}

putDogsIntoBody().then(res => console.log("we did it")).catch(err => console.log("oopsie"))