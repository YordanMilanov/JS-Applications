import { del, get, post, put } from "./api.js";

const endpoints = {
    catalog: `/data/motorcycles?sortBy=_createdOn%20desc`,
    byId: `/data/motorcycles/`
}

export async function getAllMotorcycles() {
    return get(endpoints.catalog);
}

export async function addMotorcycle(data) {
    return post('/data/motorcycles', data);
}

export async function getById(id) {
    return get(endpoints.byId + id);
}
export async function searchMotorcycles(searchText) {
    const query = encodeURIComponent(`model LIKE "${searchText}"`)

    return get(`/data/motorcycles?where=${query}`);
}

export async function deleteMotorcycle(id) {
    return del(endpoints.byId + id);
}

export async function updateMotorcycle(id, data) {
    return put(endpoints.byId + id, data);
}