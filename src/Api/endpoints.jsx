export function getEndpoint(endpoint) {
    const isOnline = window.location.hostname != "localhost"
    return isOnline ? `https://api-super3.powerpos.lk/${endpoint}` : `http://localhost:2500/${endpoint}`
}