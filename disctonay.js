import apiCall from "./api.js";
import dotenv from'dotenv'
dotenv.config()
const DictionaryAPI = process.env.DictionaryAPI


export default async function dictonary(search){
//    try {
    
       console.log(search);
       const meaning = await apiCall({
           api:DictionaryAPI,
           path:search,
           method:'GET'
        })
        // console.log("🚀 ~ file: disctonay.js:14 ~ dictonary ~ meaning:", meaning);
        // const {word,meanings} = meaning[0]
        
        const result = `${meaning.map(({word,meanings})=>{return `Word: ${word} \n${meanings.map(x=>{return `\n\nPart of speech: ${x.partOfSpeech} \n${x.definitions.map(x=>{return `\n\nDefinition : ${x.definition} \nExample : ${x?.example || ""}`})} \n\nSynonyms: ${x?.synonyms || ""} \nAntonyms: ${x?.antonyms || ""}\n`})}`})}`
        
        const maxLength = 2000;
        if (result.length > maxLength) {
            const trimmedString = result.slice(0, maxLength);
            return trimmedString; // Outputs the trimmed string
        } else {
            return result ; // Outputs the original string if it's not longer than maxLength
        }

    // } catch (error) {
    //  return 'Not Found'
    // }
}
