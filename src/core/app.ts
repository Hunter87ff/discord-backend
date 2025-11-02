import Token from '../utils/wrappers/token';
import e from 'express';

const _token = new Token({
    _id: '7456',
    name: 'John Doe',
    email: 'john.doe@example.com'
})
console.log(_token.toToken());

export default class DiscordBackendApp {
    public app: e.Application;

    constructor(){
        this.app = e();
    }

    async start(){
        this.app.listen
    }
}