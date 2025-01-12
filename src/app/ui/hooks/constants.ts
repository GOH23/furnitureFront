const BACKEND_URL = "https://1640350c0d13.vps.myjino.ru";
const fetcher = (url: string)=>fetch(BACKEND_URL+url).then((res)=>res.json())
type category_type = {
    serviceName: string,
    serviceSellCount: number
}
type service_type = {
    serviceID: string,
    Price: number,
    Image: string,
    Name: string
}

export { BACKEND_URL,fetcher, type category_type,type service_type };
