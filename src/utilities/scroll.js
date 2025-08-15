export function scrollTo(top=0,smooth=true){ 
    window.scrollTo({
        top,
        behavior: smooth ? 'smooth' : 'auto'
    })
}

export function scrollToId(elem,smooth=true){
    window.scrollTo({
        top:elem.offsetTop-100,
        behavior: smooth ? 'smooth' : 'auto'
    })
}