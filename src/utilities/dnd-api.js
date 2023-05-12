const BASE_URL = "https://www.dnd5eapi.co/api/monsters"

export async function detail(idx) {
    const options = {
        method: 'GET'
    } 
    const url = `${BASE_URL}/${idx}`
    const response = await fetch(url, options)
    
    if(response.ok){
        return response.json()
    } else {
        throw new Error("Invalid GET Request")
    }
}