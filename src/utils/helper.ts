import bcrypt from 'bcryptjs';
import type { Response } from 'express';


class Helper {
    static async hash(password: string) {
        const salt = await bcrypt.genSalt(12); // Increased to 12 for better security
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    static async compare(password: string, hashedPassword: string) {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return false;
        }
    }

    static generateOTP(length: number = 6): string {
        let otp = '';
        const characters = '0123456789';
        for (let i = 0; i < length; i++) {
            otp += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return otp;
    }



    static setCookie(res: Response, name: string, value: string, options: CookieOptions = {}) {
        res.cookie(name, value, {
            httpOnly: options.httpOnly ?? true,
            secure: options.secure ?? false,
            signed: options.signed ?? false,
            path: options.path ?? '/',
            maxAge: (options.days || 30) * 24 * 60 * 60 * 1000, // Default to 30 days
        })
    }
}


interface CookieOptions {
    days?: number;
    httpOnly?: boolean;
    secure?: boolean
    signed?: boolean;
    path?: string;
}


export default Helper;
