const fs = require('fs')
const contentFilePath= './content.json'

function Save(content){
    console.log(`> [state] saving the content... `)
    const contentString = JSON.stringify(content)
    const ret = fs.writeFileSync(contentFilePath, contentString)
    console.log('> [state] content was saved.')
    return ret
}

function Load(){
    console.log(`> [state] Loading the content... `)
    const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
    const contentJson = JSON.parse(fileBuffer)
    console.log(`> [state] Content loaded. `)
    return contentJson
}

module.exports = {
    Save,
    Load
}