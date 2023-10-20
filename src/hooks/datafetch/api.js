import axios from "axios"

export const api = axios.create({
    baseURL:"https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales-copiar/records?",
    headers:{
        "Content-Type":"application/json",
    }
})