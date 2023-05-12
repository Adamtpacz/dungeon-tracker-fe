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