let currentCharacterToGuess = [];

const hasImage = function(data){
    return data.image ? true: false;
}

const getAttribute = function(data, attribute){
    if(Array.isArray(data)){
        let image = "";
        let values = [];
        data.forEach((currentData) => {
            if(image == "" && hasImage(currentData))
            {
                image =currentData.image
            }
            values.push(currentData.name)
        });
        return {"name":attribute, "values": values, "image":image};
    }
    return hasImage(data) ? {"name":attribute, "values":data.name, "image": data.image} : {"values": data.name, "image":""};
}

const getPath = async function(path){
    const response = await fetch("https://127.0.0.1:8003"+path)
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

const getCharacterAttributes = async function(characterId){
    const pathCharacter = "https://127.0.0.1:8003/api/characters/"+characterId;
    const response = await fetch(pathCharacter)
    if (response.status == 200)
    {
        const data = await response.json()
        console.log("full data :", data)
        let characterAttributes = []
        let attributes = ["hair_color", "sex", "first_apparition", "health", "weapon"]
        let classAttributes = ["groups", "subgroups", "devilFruits", "flags"]

        characterAttributes.push({"name":"character", "values": data.name, "image":data.image})

        for (const index in attributes) 
        {
            characterAttributes.push({"name":attributes[index], "values": data[attributes[index]], "image":""})
        }

        for (const index in classAttributes) 
        {
            await addAttribute(characterAttributes, data, classAttributes[index]);
        }

        return characterAttributes
    }
    else{
        new Error(response.statusText)
    }
}

const setRandomCharacterToGuess = 
async function()
{
    currentCharacterToGuess = await getCharacterAttributes(1);
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
    console.log("object values : ", values, " char to guess : ", currentValue[column].values)
    return arraysHaveCommonElements(currentValue[column].values, values);
}

const getCharacters = async function(){
    const pathCharacter = "https://127.0.0.1:8003/api/characters?page=1";
    const response = await fetch(pathCharacter)
    if (response.status == 200)
    {
        const data = await response.json()
        // console.log(data['hydra:member'][0])
        // console.log("TEST : ", data['hydra:member'][0]["name"]) 
        return data
    }
    else{
        new Error(response.statusText)
    }
}

export {
    compareValues,
    getCharacters,
    getCharacterAttributes,
    setRandomCharacterToGuess
    }