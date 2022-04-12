export const getLocalToken = () => {var a = localStorage.getItem('token'); if(!a){return "abcd";} else {return a;}}

export const saveLocalToken = (token: string) => localStorage.setItem('token', token);

export const removeLocalToken = () => localStorage.removeItem('token');

export const getMonth = (str: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    return months[str - 1]


}

export const getTierImageStyle = (str: number) => {
    // <img  src="@/assets/img/tier/dragon.svg"  width='30px'  height='30px' style='filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);'/>


        
        const list =[ 
            ['@/assets/img/tier/dragon.svg',  'filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);'],
            ['@/assets/img/tier/unicorn.svg',  'filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);'],
            ['@/assets/img/tier/lion.svg',  'filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);'],
            ['@/assets/img/tier/wolf.svg',  'filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);'],
            ['@/assets/img/tier/panda.svg',  'filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);'],
        
        ]
        return list[str-1]
        
    
}
