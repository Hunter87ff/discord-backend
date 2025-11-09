import type { Request, Response } from 'express';
import { ObjectId } from "mongodb";
import Token from '@/utils/wrappers/token';

export default class AuthController {

    static async signup(req: Request, res: Response) {
        try{
            console.log(req.body)
            const {username, email, password} = req.body;

            const tempToken = new Token({
                _id: new ObjectId().toString(),
                name: username,
                email: email
            })

            const user = await res.models.user.create({
                _id : tempToken._id,
                username: username,
                global_name: username,
                email: email,
                password: password,
                token: tempToken.toString(), // Placeholder, will be updated after token generation
            });

            res.handler.created(res, "User signed up successfully", user)

        }catch(error){
            res.handler.internalServerError(res, "Failed to signup", error)
        }
    
    }



    static async login(req: Request, res: Response) {

    }
}

