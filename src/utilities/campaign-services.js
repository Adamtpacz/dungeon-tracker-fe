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