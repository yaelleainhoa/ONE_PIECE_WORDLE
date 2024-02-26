const getRaces = async function(){
    const pathRace = "https://127.0.0.1:8000/api/races?page=1";
    const response = await fetch(pathRace)
    // console.log(response)
    if (response.status == 200)
    {
        const data = await response.json()
        // console.log("TEST : ", data['hydra:member'][0]["name"]) 
        return data
    }
    else{
        new Error(response.statusText)
    }
}

const initializeAttributes = 
    function()
    {
        let currentCharacter = []
        currentCharacter.push({"values": "Nico Robin", "image": "https://static.printler.com/cache/8/9/d/7/2/a/89d72a714be71411cb521f59c86111d13eee5bf5.jpg"});
        currentCharacter.push({"values": ["Chapeau de paille", "Baroque Works"], "image": ""});
        currentCharacter.push({"values": "1,80m", "image": ""}); 
        return currentCharacter;
    }

function arraysHaveCommonElements(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        if (arr1!=arr2){
            return 0;
        }
        return 1;
    }
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
    return sortedArr1.every((value, index) => value === sortedArr2[index]) && sortedArr1.length === sortedArr2.length ? 1 : arr1.some(item => arr2.includes(item)) ? 2 : 0;
}

const compareValues =
    function(values, column) {
    let currentValue= initializeAttributes();
    return arraysHaveCommonElements(currentValue[column].values, values);
}

export {
    compareValues,
    getRaces
    }