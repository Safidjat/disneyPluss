export const selectRandom20=(res)=> {
    const arr=[...res];
    return arr.sort(()=>Math.random()-0.5).slice(0,20)
}