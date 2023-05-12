import { Routes, Route } from "react-router-dom"
import CampaignIndex from "../../pages/Campaign-Index"
import CampaignShow from "../../pages/Campaign-Show"
import CampaignCreate from "../../pages/Campaign-Create"
import CampaignUpdate from "../../pages/Campaign-Update"
import EncounterShow from "../../pages/Encounter-Show"

export default function Main() {
    return (
        <main>
            <h1>Dungeon Tracker</h1>
            <Routes>
                <Route path='/' element={ <CampaignIndex /> } />
                <Route path='/campaign/new' element={ <CampaignCreate /> } />
                <Route path='/campaign/:id' element={ <CampaignShow /> } />
                <Route path='/campaign/:id/edit' element={ <CampaignUpdate /> } />
                <Route path='/campaign/:id/encounter' element={ <EncounterShow /> } />
            </Routes>
        </main>
    )
}