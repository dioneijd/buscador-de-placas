const sinespApi = require('sinesp-api')
const state = require('./state.js')


async function robot(){
    console.log('> [api] Stating api robot... ')

    const content = state.Load()


    
    if (!content.platesData) {
        content.platesData = []
        console.log('> [api] plates data element created. ')
    }

    
    
    await getAndSaveDataOfAllPlates()
    state.Save(content)
    console.log('> [api] Api has finished.')


    
    async function getAndSaveDataOfAllPlates(){
        console.log('> [api] Starting get and save plate data for all...')
        
        content.apiErrorLog = []

        const promises = content.allPlatesCombination.map(async plate => getAndSaveDataOfPlate(plate))

        console.log('> [api] Waiting for all promisse return...')

        


        await Promise.all(promises)

        content.NumOfPlateData = content.platesData.length
        console.log('> [api] Get and save plate data for all...')
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
            content.apiErrorLog.push(`[${plateNumber}]: ${error}`)
        }
        
        console.log('> [api] Sinesp Api already returned.')
    }

}

module.exports = robot


