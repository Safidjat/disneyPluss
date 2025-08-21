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

// function transform(arr){
//     const allUnicIds=new Set(arr.filter(item=>item.id));
//     let idsToRemove=[];
//     allUnicIds.forEach(elemId=>{
//         const elems=arr.filter(item=>item.id==elemId)
//         if(elems.length>1)  idsToRemove.push(elemId)
//     })
//     const cleanArr = arr.filter(item => !idsToRemove.has(item.id));
//     idsToRemove.forEach(iD=>{
//         cleanArr.push(arr.find(elem=>elem.id===iD));
//     })
//     return cleanArr

// }
const filterData=(arr)=>{
    return arr.filter(item=>
          item.id!='13805'
          &&item.id!='173705'
          &&item.id!='611251'
          &&item.id!='1428'
          &&item.id!='460229'
    )
}
export async function getAllDetails() {
    try {
        const res = await instanceForDisney.get(`/details`)
        return filterData(res.data)
    } catch (error) {
        return null
    }
}

export async function getAllMovies() {
    try {
        const res = await instanceForDisney.get(`/movies`)
        return filterData(res.data)
    } catch (error) {
        return null
    }
}
export async function getAllSeries() {
    try {
        const res = await instanceForDisney.get(`/series`)
        return filterData(res.data)
    } catch (error) {
        return null
    }
}

