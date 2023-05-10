import { useState, useEffect } from 'react'

export default function CampaignIndex(props) {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ campaign, setCampaign ] = useState([])

    async function getCampaign() {

    }

    return <h1>Campaign Index Page</h1>
}