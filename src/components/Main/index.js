import { Routes, Route } from "react-router-dom"
import CampaignIndex from "../../pages/Campaign-Index"
import CampaignShow from "../../pages/Campaign-Show"
import CampaignCreate from "../../pages/Campaign-Create"
import CampaignUpdate from "../../pages/Campaign-Update"
import EncounterIndex from "../../pages/Encounter-Index"
import EncounterShow from "../../pages/Encounter-Show"
import EncounterCreate from "../../pages/Encounter-Create"


export default function Main() {
    return (
        <main>
            <h1>Dungeon Tracker</h1>
            <Routes>
                <Route path='/' element={ <CampaignIndex /> } />
                <Route path='/campaign/new' element={ <CampaignCreate /> } />
                <Route path='/campaign/:id' element={ <CampaignShow /> } />
                <Route path='/campaign/:id/edit' element={ <CampaignUpdate /> } />
                <Route path='/campaign/:id/encounters' element={ <EncounterIndex /> } />
                <Route path='/campaign/:id/encounters/new' element={ <EncounterCreate /> } />
                <Route path='/encounter/:id' element={ <EncounterShow /> } />
            </Routes>
        </main>
    )
}