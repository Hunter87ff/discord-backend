import jsonwebtoken from 'jsonwebtoken';
import { appConfig } from '../../config';

interface TokenPayload {
    _id: string;
    name: string;
    email: string;
}



export default class Token {
    public _id: string;
    public name: string;
    public email: string;

    constructor(payload: TokenPayload) {
        this._id = payload._id;
        this.name = payload.name;
        this.email = payload.email;
    }

    static fromToken(token: string, jwtSecret: string): Token | null {
        try {
            const decoded = jsonwebtoken.verify(token, jwtSecret) as TokenPayload;
            return new Token({
                _id: decoded._id,
                name: decoded.name,
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
            name: this.name,
            email: this.email
        };
        return jsonwebtoken.sign(payload, appConfig.jwtSecret, { expiresIn: appConfig.jwtExpiresIn });
    }
}


