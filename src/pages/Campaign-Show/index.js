import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getCampaign } from '../../utilities/campaign-services'

export default function CampaignShow(props) {

    const { id } = useParams()
    console.log("documentId:", id)

    return <h1>Campaign Show Page</h1>
}