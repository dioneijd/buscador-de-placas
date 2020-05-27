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
            const ano = plateData.ano.toUpperCase()
            const municipio = plateData.municipio.toUpperCase()
            
            if (
                cor == 'PRATA' 
                && modelo.includes('GOL') 
                && !modelo.includes('GOLF') 
                && (
                    municipio.includes('SC') 
                    //|| municipio.includes('PR')
                )
                && (
                    ano.includes('2007') || ano.includes('2008') ||
                    ano.includes('2009') || ano.includes('2010') || ano.includes('2011') ||
                    ano.includes('2012') || ano.includes('2013') || ano.includes('2014') ||
                    ano.includes('2015') || ano.includes('2016') || ano.includes('2017') ||
                    ano.includes('2018') || ano.includes('2019') || ano.includes('2020') 
                )
                
                ) {
                
                
                    content.suspectsPlates.push(plateData)
            }
        })
    }


}

module.exports = robot