import { BACKEND_URL } from "../ui/hooks/constants";
import ServicePage from "../ui/ServicePage";

export default async function Services() {
    const fetchedServices = await fetch(BACKEND_URL + '/furniture',{cache: "no-cache"})
    const categories = await fetchedServices.json()

    return (
        <ServicePage category={categories}/>
    );
}   