let currentCharacterToGuess = [];
let attributesList = [];

const setAttributes = async function(){
    attributesList = [
        {"database_name": "names", "full_name":"Name", "type": "simple_attribute", "all_possibilities":null}, //0
        {"database_name": "hair_color", "full_name":"Hair Color", "type": "simple_attribute", "all_possibilities":null}, //1
        {"database_name": "sex", "full_name":"Gender", "type": "simple_attribute", "all_possibilities":null}, //2
        {"database_name": "races", "full_name":"Race", "type": "foreign_attribute", "all_possibilities":null}, //3
        {"database_name": "groups", "full_name":"Group", "type": "foreign_attribute", "all_possibilities":null}, //4
        {"database_name": "subgroups", "full_name":"Subgroup", "type": "foreign_attribute", "all_possibilities":null}, //5
        {"database_name": "main_flag", "full_name":"Main crew", "type": "foreign_attribute", "all_possibilities":null}, //6
        {"database_name": "flags", "full_name":"Crews", "type": "foreign_attribute", "all_possibilities":null}, //7
        {"database_name": "devilFruits", "full_name":"Devil Fruit", "type": "foreign_attribute", "all_possibilities":null}, //8
        {"database_name": "hakis", "full_name":"Haki", "type": "foreign_attribute", "all_possibilities":null}, //9
        {"database_name": "weapon", "full_name":"Weapon", "type": "simple_attribute", "all_possibilities":null}, //10
        {"database_name": "first_apparition", "full_name":"First apparition", "type": "simple_attribute", "all_possibilities":null}, //11
        {"database_name": "seas", "full_name":"Home sea", "type": "foreign_attribute", "all_possibilities":null}, //12
        {"database_name": "health", "full_name":"Health", "type": "simple_attribute", "all_possibilities":null}, //13
    ];

    let currentList = await getPath("/api/races");
    attributesList[3].all_possibilities = currentList['hydra:member'].map(u => u.name).join(", ");
    currentList = await getPath("/api/groups");
    attributesList[4].all_possibilities = currentList['hydra:member'].map(u => u.name).join(", ");
    currentList = await getPath("/api/subgroups");
    attributesList[5].all_possibilities = currentList['hydra:member'].map(u => u.name).join(", ");
    currentList = await getPath("/api/seas");
    attributesList[12].all_possibilities = currentList['hydra:member'].map(u => u.name).join(", ");
    return attributesList;
}

const hasImage = function(data){
    return data.image ? true: false;
}

const getAttribute = function(data, attribute){
    if(Array.isArray(data)){
        let values = [];
        data.forEach((currentData) => {
            values.push(currentData.name)
        });
        return {"name":attribute, "values": values, "image":"", "full_name":data.full_name};
    }
    return hasImage(data) ? {"name":attribute, "values":data.name, "image": data.image, "full_name":data.full_name} : {"name": attribute, "values": data.name, "image":"", "full_name":data.full_name};
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
        for (const i in paths) 
        {
            currentData = await getPath(paths[i]);
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
        characterAttributes.push({"name":attribute,"values":"None", "image":"", "full_name":data.full_name})
    }
}

const getCharacterAttributes = async function(data)
{
    let characterAttributes = []
    characterAttributes.push({"id":data.id, "name":"character", "values": data.names[0], "image":data.icon, "full_name": "Name"})

    
    for (let i = 1; i < attributesList.length; i++)
    {
        if(attributesList[i].type == "simple_attribute")
        {
            if(data[attributesList[i].database_name]) characterAttributes.push({"name":attributesList[i].database_name, "values": data[attributesList[i].database_name], "image":"", "full_name":attributesList[i].full_name})
            else characterAttributes.push({"name":attributesList[i], "values": "None", "image":"", "full_name":attributesList[i].full_name})
        }
        else{
            await addAttribute(characterAttributes, data, attributesList[i].database_name)
        }

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
    return {"names" : randomCharacter.names, "id":randomCharacter.id, "image": randomCharacter.icon, "clue":randomCharacter.emoji};
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
    return sortedArr1.every((value, i) => value === sortedArr2[i]) && sortedArr1.length === sortedArr2.length ? 1 : arr1.some(item => arr2.includes(item)) ? 0 : -1;
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
    for (const i in charactersSuggestionsAllAttributes)
    {
        charactersSuggestions.push({"id":charactersSuggestionsAllAttributes[i].id, "name":charactersSuggestionsAllAttributes[i].names[0]});
    }
    return charactersSuggestions;
}

export {
    compareValues,
    getCharactersSuggestions,
    getCharacterAttributesById,
    setRandomCharacterToGuess,
    setAttributes
    }