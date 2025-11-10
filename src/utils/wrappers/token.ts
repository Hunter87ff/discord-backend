import jsonwebtoken from 'jsonwebtoken';
import { appConfig } from '../../config';

interface TokenPayload {
    _id: string;
    username: string;
    email: string;
}



export default class Token {
    public _id: string;
    public username: string;
    public email: string;

    constructor(payload: TokenPayload) {
        this._id = payload._id;
        this.username = payload.username;
        this.email = payload.email;
    }

    static fromToken(token: string, jwtSecret: string): Token | null {
        try {
            const decoded = jsonwebtoken.verify(token, jwtSecret) as TokenPayload;
            return new Token({
                _id: decoded._id,
                username: decoded.username,
                email: decoded.email
            });
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    toString(): string {
        const payload: TokenPayload = {
            _id: this._id,
            username: this.username,
            email: this.email
        };
        return jsonwebtoken.sign(payload, appConfig.jwtSecret, { expiresIn: appConfig.jwtExpiresIn });
    }
}


