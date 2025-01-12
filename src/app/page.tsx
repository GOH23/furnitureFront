import Image from "next/image";
import { MainPage } from "./ui/MainPage";
import { BACKEND_URL } from "./ui/hooks/constants";
export default async function Home() {
  const fetchedServices = await fetch(BACKEND_URL + '/furniture?limit=3')
  const categories = await fetchedServices.json()
  return (
    <MainPage category={categories} />
  );
}
