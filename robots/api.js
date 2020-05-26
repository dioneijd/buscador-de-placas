const sinespApi = require('sinesp-api')
const state = require('./state.js')


async function robot(){
    console.log('> [api] Stating api robot... ')

    const content = state.Load()


    if (!content.platesData) {
        content.platesData = []
        console.log('> [api] plates data element created. ')
    }
    
    let promises = []
    let apiPendingPromises = []
    let apiPromisesWaitQueue = []

    await getAndSaveDataOfAllPlates()
    state.Save(content)
    console.log(`> [api] Number of plate downloaded: ${content.NumOfPlateData} of ${content.numberOfComb}`)
    console.log('> [api] Api has finished.')


    
    async function getAndSaveDataOfAllPlates(){
        console.log('> [api] Starting get and save plate data for all...')
        
        content.apiErrorLog = []

        promises = content.allPlatesCombination.map(async plate => getAndSaveDataOfPlate(plate))

        console.log('> [api] Waiting for all promisse return...')
        await Promise.all(promises)

        content.NumOfPlateData = content.platesData.length
        console.log('> [api] All plates data were got.')
    }


    async function getAndSaveDataOfPlate(plateNumber){
        console.log('> [api] Checking if the plate data already downloaded... ')        
        const plate = content.platesData.find(plateData => plateData.placa == plateNumber)

        if (!plate) {
            console.log('> [api] Plate data needs to be downloaded ... ')
            await callApi(plateNumber)
        
        } else {
            console.log('> [api] Plate data already in the content ... ')
        }
    }

    
    async function callApi(plateNumber){
        console.log('> [api] Calling Sinesp Api... ')

        try {

            if (apiPendingPromises.length >= 5) return

            
            const plateIndex = apiPromisesWaitQueue.findIndex(plate => plate == plateNumber)
            if (plateIndex) apiPromisesWaitQueue.splice(plateIndex, 1)

            apiPendingPromises.push(plateNumber)

            const data = await sinespApi.search(plateNumber)
    
            const plateData = {
                placa: data.placa,
                modelo: data.modelo,
                marca: data.marca,
                cor: data.cor,
                ano: `${data.ano}/${data.anoModelo}`,
                municipio: `${data.municipio}, ${data.uf}`
            }
    
            content.platesData.push(plateData)
            
            

            
        } catch (error) {
            if (error == 'Error: sem dados na base') 
                content.platesData.push({placa: plateNumber})
            
            // if (error == 'SyntaxError: Unexpected token < in JSON at position 0') 
            //     apiPromisesWaitQueue.push(plateNumber)
            

            content.apiErrorLog.push(`[${plateNumber}]: ${error}`)
        }
        
        console.log('> [api] Sinesp Api already returned.')
    }

}

module.exports = robot


