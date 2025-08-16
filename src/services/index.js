import { instanceForAuth, instanceForDisney } from "./instance";

export async function getUseLogin(reqBody) {
    try {
        const res = await instanceForAuth.post('/auth/login', reqBody);
        return res.data;
    } catch (error) {
        return error
    }
}

export async function getUseRegister(reqBody) {
    try {
        const res = await instanceForAuth.post('/auth/register', reqBody);
        return res.data;
    } catch (error) {
        return error
    }
}

export async function useVerify() {
    try {
        const res = await instanceForAuth.get('/auth/verify-token');
        return res.data;
    } catch (error) {
        return error?.response?.status
    }
}

export async function getMainSliders() {
    try {
        const res = await instanceForDisney.get('/mainTopSliders')
        return res.data
    } catch (error) {
        return null
    }
}

export async function getMainCategories(id) {
    try {
        const res = await instanceForDisney.get(`/categories/${id}`)
        return res.data
    } catch (error) {
        return null
    }
}

export async function getDetailsById(id) {
    try {
        const res = await instanceForDisney.get(`/details/${id}`)
        return res.data
    } catch (error) {
        return null
    }
}

