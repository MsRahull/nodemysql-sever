
export const storageUserData = (data) =>{
    localStorage.setItem('loginid', data)
}

export const getUserData = ()=>{
    return localStorage.getItem('loginid');
}

export const removeUserData = () => {
    return localStorage.removeItem('loginid');
};