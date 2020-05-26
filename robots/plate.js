const state = require('./state.js')

function robot(logLevel) {
    if (logLevel > 0) console.log('> [plate] Stating plate robot... ')
    
    // ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    // ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    
    const content = state.Load()

    
    content.searchCombination = {
        letter_1: ['A', 'B', 'C', 'D', 'E', 'F'], //,   'L', 'M', 'O'
        letter_2: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        letter_3: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        number_1: ['7'],
        number_2: ['2'],
        number_3: ['4'],
        number_4: ['7'],
    }

    content.numberOfComb = content.searchCombination.letter_1.length * content.searchCombination.letter_2.length * content.searchCombination.letter_3.length * content.searchCombination.number_1.length * content.searchCombination.number_2.length * content.searchCombination.number_3.length * content.searchCombination.number_4.length
    //console.log(`> [plate] Number of combination: ${content.numberOfComb}`)
    
    definePlateToCheck()
    state.Save(content)

    
    //console.log('> [plate] Plate robot has finished. ')
    
    
    
    function definePlateToCheck(){
        //console.log(`> [plate] Starting define plate to check...`)
        
        const comb = content.searchCombination        
        content.allPlatesCombination = []
    
        comb.letter_1.forEach(letter_1 => {
            comb.letter_2.forEach(letter_2 => {
                comb.letter_3.forEach(letter_3 => {
                    comb.number_1.forEach(number_1 => {
                        comb.number_2.forEach(number_2 => {
                            comb.number_3.forEach(number_3 => {
                                comb.number_4.forEach(number_4 => {
                                    const plate = `${letter_1}${letter_2}${letter_3}${number_1}${number_2}${number_3}${number_4}`
    
                                    content.allPlatesCombination.push(plate)                                
                                })                            
                            })                        
                        })
                    })
                })
            })
        })

        
        //console.log(`> [plate] Plate to check already defined.`)
    }
}


module.exports = robot









