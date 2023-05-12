import * as encounterAPI from './encounter-api'

export async function allCampaigns() {
    try {
        const data = await campaignAPI.index()
        return data
    } catch(err) {
        console.log(err)
        throw new Error(err)
    }
}