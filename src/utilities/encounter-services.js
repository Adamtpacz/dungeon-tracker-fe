import * as encounterAPI from './encounter-api'

export async function allEncounters(id) {
    try {
        const data = await encounterAPI.index(id)
        return data
    } catch(err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function createEncounter(data, id) {
    try {
        const newEncounter = await encounterAPI.create(data, id)
        return newEncounter
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function getEncounter(id){
    try {
        const encounterData = await encounterAPI.detail(id)
        return encounterData
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function updateEncounter(id, data){
    try {
        const updatedEncounter = await encounterAPI.update(id, data)
        return updatedEncounter
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}