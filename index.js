const robots = {
    plate: require('./robots/plate.js'),
    api: require('./robots/api.js'),
    search: require('./robots/search.js')
}


async function Start(){
    console.log('> [index] Starting index...')
    //console.log('> =========================')
    robots.plate()
    //console.log('> =========================')
    await robots.api()
    //console.log('> =========================')
    robots.search()
    console.log('> [index] process finished.')
    setTimeout(Start, 2000)
}


Start()