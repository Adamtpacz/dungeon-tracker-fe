const BASE_URL = process.env.REACT_APP_BASE_URL

export async function index(id) {
    try {
        const options = {
            method: 'GET'
        }
        const url = `${BASE_URL}/campaign/${id}/encounters`
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

export async function create(data, id) {
    try {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        
        const url = `${BASE_URL}/campaign/${id}/encounters`
        const response = await fetch(url, options)
        
        if(response.ok){
            return response.json()
        } else {
            throw new Error("Invalid POST Request")
        }
    } catch(err){
        console.log(err)
        return err
    }
}

export async function detail(id) {
    const options = {
        method: 'GET'
    } 
    const url = `${BASE_URL}/encounter/${id}`
    const response = await fetch(url, options)
    
    if(response.ok){
        return response.json()
    } else {
        throw new Error("Invalid GET Request")
    }
}

export async function update(id, data){
    try {
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        } 
        const url = `${BASE_URL}/encounter/${id}`
        const response = await fetch(url, options)
        
        if(response.ok){
            return response.json()
        } else {
            throw new Error("Invalid PUT Request")
        }

    } catch(err){
        console.log(err)
        return err
    }
}