const isValid = (value)=>{
    if(typeof value ==='null' || value ==='undefined') return false
    if(typeof value ==='String' && value.trim().length ===0) return false
    return true
}