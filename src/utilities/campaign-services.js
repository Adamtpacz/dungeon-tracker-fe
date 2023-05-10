import * as campaignAPI from './campaign-api'

export async function getCampaign() {
    try {
        const data = await campaignAPI.index()
        return data
    } catch(err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function createCampaign(data) {
    try {
        const newCampaign = await campaignAPI.create(data)
        return newCampaign
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}