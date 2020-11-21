import moment from 'moment';

export const capitalizeFLetter = (word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1);
}


export const formatDate = (date)=>{
    return moment.utc(date).local().format('MMMM D YYYY');
}

