const axios = require("axios");

class TwitchAPI {
    constructor(client_id, client_secret){
        this.client_id = client_id;
        this.client_secret = client_secret;
    }

    async auth(){
        this.token = (await axios.post("https://id.twitch.tv/oauth2/token", {
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: "client_credentials"
        })).data.access_token;
    }

    async getBroadcaster(login){
        if(!this.token)
            await this.auth();

        if(this.token){
            try{
                return (await axios.get(`https://api.twitch.tv/helix/users?login=${login}`, {
                    headers: {
                        "Client-Id": this.client_id,
                        "Authorization": "Bearer " + this.token
                    }
                })).data.data[0];
            }
            catch(e){
                return null;
            }
        }
        else{
            return null;
        }
    }

    async getChannelInfo(broadcaster_id){
        if(!this.token)
            await this.auth();

        if(this.token){
            try{
                return (await axios.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${broadcaster_id}`, {
                    headers: {
                        "Client-Id": this.client_id,
                        "Authorization": "Bearer " + this.token
                    }
                })).data.data[0];
            }
            catch(e){
                return null;
            }
        }
        else{
            return null;
        }
    }

    async getVideos(user_id){
        if(!this.token)
            await this.auth();

        if(this.token){
            try{
                return (await axios.get(`https://api.twitch.tv/helix/videos?user_id=${user_id}`, {
                    headers: {
                        "Client-Id": this.client_id,
                        "Authorization": "Bearer " + this.token
                    }
                })).data.data;
            }
            catch(e){
                return null;
            }
        }
        else{
            return null;
        }
    }

    async getStreamsStatus(user_id){
        if(!this.token)
            await this.auth();

        if(this.token){
            try{
                return (await axios.get(`https://api.twitch.tv/helix/streams?user_id=${user_id}`, {
                    headers: {
                        "Client-Id": this.client_id,
                        "Authorization": "Bearer " + this.token
                    }
                })).data.data[0];
            }
            catch(e){
                return null;
            }
        }
        else{
            return null;
        }
    }
}

module.exports = TwitchAPI;