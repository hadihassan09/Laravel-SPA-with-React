import moment from 'moment';

export const capitalizeFLetter = (word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1);
}


export const formatDate = (date)=>{
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format('dddd,DD MMMM, h:mm:ss a');;
}

