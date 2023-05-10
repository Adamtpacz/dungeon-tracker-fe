import * as campaignAPI from './campaign-api'

export async function allCampaigns() {
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

export async function getCampaign(id){
    try {
        const campaignData = await campaignAPI.detail(id)
        return campaignData
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}