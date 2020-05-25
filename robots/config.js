const readline = require('readline-sync')
const state = require('./state.js')


function robot(){
    console.log('> [config] Stating config robot... ')


    function AskToChangeConfiguration() {
        return readline.question('Do you want change the configuration: ')
    }
    

    console.log('> [config] Config robot has finished.')
}

module.exports = robot