const getRaces =
    async function(){
        const pathRace = "https://127.0.0.1:8000/api/races?page=1";
        const response = await fetch(pathRace)
        console.log(response)
        if (response.status == 200)
        {
            const data = await response.json()
            console.log("TEST : ", data['hydra:member'][0]["name"])
            return data
        }
        else{
            new Error(response.statusText)
        }
    }



    export {
        getRaces
      }