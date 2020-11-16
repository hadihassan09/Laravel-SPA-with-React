import axios from 'axios';

class AppState{
    constructor() {
        axios.get('/api/user').then(response=>{
            this.isLoggedIn = true;
            this.user=response.data;
        }).catch(error=>{
            this.isLoggedIn = false;
            this.user = null;
        });
    }

    login(user){
        this.isLoggedIn = true;
        this.user = user;
    }

    logout(){
        this.isLoggedIn=false;
        this.user=null;
    }
}

const appState = new AppState();

export default appState;
