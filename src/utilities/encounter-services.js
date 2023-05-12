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