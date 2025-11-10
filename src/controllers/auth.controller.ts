import type { Request, Response } from 'express';
import { ObjectId } from "mongodb";
import Token from '@/utils/wrappers/token';

export default class AuthController {

    
    /**
     * v1 signup endpoint 
     * @route POST /v1/auth/signup
     * @access Public
     */
    static async signup(req: Request, res: Response) {
        try{
            const {username, email, password} = req.body;

            const tempToken = new Token({
                _id: new ObjectId().toString(),
                username: username,
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


    
    /**
     * v1 verify endpoint 
     * @route POST /v1/auth/verify
     * @access Public
     */
    static async verify(req :Request, res: Response) {
        try{
            const {email, otp} = req.query;

            if (!email || !otp) {
                return res.handler.badRequest(res, "Email and OTP are required for verification");
            }

            const user = await res.models.user.findOne({email : email.toString(), is_verified : false});
            if (!user) {
                return  res.handler.notFound(res, "User not found or already verified");
            }

            if (user.otp !== otp.toString()) {
                return res.handler.unAuthorized(res, "Invalid OTP");
            }

            user.is_verified = true;
            user.otp = res.helper.generateOTP(); // Invalidate the OTP after successful verification
            await user.save();


            res.helper.setCookie(res, 'token', user.token);
            res.handler.ok(res, "User verified successfully", user);

        }catch(error){
            res.handler.internalServerError(res, "Failed to verify", error)
        }
    }



    /**
     * v1 login endpoint 
     * @route POST /v1/auth/login
     * @access Public
     */
    static async login(req: Request, res: Response) {
        try{
            const { email, password, phone} = req.body;

            if (!password || !email && !phone) {
                return res.handler.badRequest(res, "Password, (Email or phone) is required for login");
            }

            const filter = email ? { email: email } : { phone: phone };

            const user = await res.models.user.findOne({...filter, is_verified : true});

            if (!user) {
                return res.handler.notFound(res, "User not found");
            }

            const isPasswordValid = await res.helper.compare(password, user.password);

            if (!isPasswordValid) {
                return res.handler.unAuthorized(res, "Invalid password");
            }

            res.helper.setCookie(res, 'token', user.token);
            res.handler.ok(res, "User logged in successfully", user)

        }catch(error){
            res.handler.internalServerError(res, "Failed to login", error)
        }
    }
}

