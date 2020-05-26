const state = require('./state.js')

function robot(){
    console.log('> [search] Stating search robot... ')


    const content = state.Load()
    content.suspectsPlates = []

    search()
    state.Save(content)

    console.log('===== LISTA DE VEICULOS SUSPEITOS =====')
    console.log(content.suspectsPlates)


    function search(){
        
        content.platesData.forEach(plateData => {

            if (!plateData.cor) return 

            const cor = plateData.cor.toUpperCase()
            const modelo = plateData.modelo.toUpperCase()
            
            if (cor == 'PRATA' && modelo.includes('GOL')) {
                content.suspectsPlates.push(plateData)
            }
        })
    }


}

module.exports = robot