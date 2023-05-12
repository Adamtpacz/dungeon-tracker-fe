const BASE_URL = process.env.REACT_APP_BASE_URL

export async function index(id) {
    try {
        const options = {
            method: 'GET'
        }
        const url = `${BASE_URL}/${id}/encounters`
        const response = await fetch(url, options)
        
        if(response.ok){
            return response.json()
        } else {
            throw new Error("Invalid GET Request")
        }
    } catch(err){
        console.log(err)
        return err
    }
}