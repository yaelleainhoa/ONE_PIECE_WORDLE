let currentCharacterToGuess = [];

const hasImage = function(data){
    return data.image ? true: false;
}

const getAttribute = function(data, attribute){
    if(Array.isArray(data)){
        let values = [];
        data.forEach((currentData) => {
            values.push(currentData.name)
        });
        return {"name":attribute, "values": values, "image":""};
    }
    return hasImage(data) ? {"name":attribute, "values":data.name, "image": data.image} : {"values": data.name, "image":""};
}

const getPath = async function(path){
    const response = await fetch("https://127.0.0.1:8000"+path)
    if (response.status == 200)
    {
        const data = await response.json()
        return data
    }
    else{
        new Error(response.statusText)
    }
}

const getPaths = async function(paths){
    if(Array.isArray(paths)){
        let data =[]
        let currentData = []
        for (const index in paths) 
        {
            currentData = await getPath(paths[index]);
            data.push(currentData);
        }
        return data;
    }
    return getPath(paths);
}

const addAttribute = async function(characterAttributes, data, attribute)
{
    let attributes = await getPaths(data[attribute])
    if (attributes.length != 0)
    {
        attributes = getAttribute(attributes, attribute)
        characterAttributes.push(attributes)
    }
    else{
        characterAttributes.push({"name":attribute,"values":"None", "image":""})
    }
}

const getCharacterAttributes = async function(data)
{
    let characterAttributes = []
    let attributes = ["hair_color", "sex", "first_apparition", "health", "weapon"]
    let classAttributes = ["groups", "subgroups", "devilFruits", "main_flag", "flags", "hakis", "seas", "races"]

    characterAttributes.push({"name":"character", "values": data.names[0], "image":data.image})

    for (const index in attributes) 
    {
        if(data[attributes[index]]) characterAttributes.push({"name":attributes[index], "values": data[attributes[index]], "image":""})
        else characterAttributes.push({"name":attributes[index], "values": "None", "image":""})
    }

    for (const index in classAttributes) 
    {
        await addAttribute(characterAttributes, data, classAttributes[index]);
    }

    return characterAttributes
}

const getCharacterAttributesById = async function(characterId){
    const pathCharacter = "https://127.0.0.1:8000/api/characters/"+characterId;
    const response = await fetch(pathCharacter)
    if (response.status == 200)
    {
        const data = await response.json()
        let characterAttributes = await getCharacterAttributes(data);
        return characterAttributes;
    }
    else{
        new Error(response.statusText)
    }
}

const setRandomCharacterToGuess = 
async function(difficulty)
{
    let randomCharacter = await getPath("/api/random-character/"+difficulty)
    currentCharacterToGuess = await getCharacterAttributes(randomCharacter);
    return currentCharacterToGuess;
}

function arraysHaveCommonElements(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        if (arr1!=arr2){
            return -1;
        }
        return 1;
    }
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
    return sortedArr1.every((value, index) => value === sortedArr2[index]) && sortedArr1.length === sortedArr2.length ? 1 : arr1.some(item => arr2.includes(item)) ? 0 : -1;
}

const compareValues =
    function(values, column) {
    let currentValue = currentCharacterToGuess;
    return arraysHaveCommonElements(currentValue[column].values, values);
}

const getCharacters = async function(){
    const pathCharacter = "https://127.0.0.1:8000/api/characters?page=1";
    const response = await fetch(pathCharacter)
    if (response.status == 200)
    {
        const data = await response.json()
        return data
    }
    else{
        new Error(response.statusText)
    }
}

const getCharactersSearch = async function(search, nb){
    const pathCharacter = search=="" ? "https://127.0.0.1:8000/api/characters?page=1" : "https://127.0.0.1:8000/api/characters?names[]="+search;
    const response = await fetch(pathCharacter)
    if (response.status == 200)
    {
        const data = await response.json()
        let charactersData = data['hydra:member'].slice(0,nb)
        return charactersData;
    }
    else{
        new Error(response.statusText)
    }
}

const getCharactersSuggestions = async function(search, nb)
{
    let charactersSuggestionsAllAttributes = await getCharactersSearch(search, nb);
    if (charactersSuggestionsAllAttributes == []) return []
    let charactersSuggestions = []
    for (const index in charactersSuggestionsAllAttributes)
    {
        charactersSuggestions.push({"id":charactersSuggestionsAllAttributes[index].id, "name":charactersSuggestionsAllAttributes[index].names[0]});
    }
    return charactersSuggestions;
}

export {
    compareValues,
    getCharactersSuggestions,
    getCharacterAttributesById,
    setRandomCharacterToGuess
    }