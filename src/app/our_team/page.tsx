import { BACKEND_URL } from "../ui/hooks/constants";
import ServicePage from "../ui/ServicePage";
import OurTeamPage, { PersonalType } from "../ui/TeamPage";

export default async function TeamPage() {
    const fetchedData = await fetch(BACKEND_URL+"/telegram/masters")
    const temp = await fetchedData.json();
    return (
        <OurTeamPage data={temp}/>
    );
}