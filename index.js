const robots = {
    plate: require('./robots/plate.js'),
    api: require('./robots/api.js')
}


async function Start(){
    console.log('> [index] Starting index...')
    console.log('> =========================')
    robots.plate()
    console.log('> =========================')
    await robots.api()    
    console.log('> [index] process finished.')
}

Start()