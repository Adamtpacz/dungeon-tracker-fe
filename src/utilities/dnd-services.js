import * as dndAPI from './dnd-api'

export async function getMonster(idx){
    try {
        const monsterData = await dndAPI.detail(idx)
        return monsterData
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}