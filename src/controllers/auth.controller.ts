import type { Request, Response } from 'express';


class AuthController {

    static async login(req: Request, res: Response): Promise<void> {
        res.status(200).json({ message: 'Login successful' });
    }
}


const sm  = 1n << 11n // send messages
const cpt  = 1n << 35n // create public threads

const permissions = cpt + sm
console.log("can send message? :", (permissions & sm) === sm)
//  can send message? : true


const x = 1 << 3
console.log("x:", x)
const p = x + 4
console.log((p&x), "x:", (p & x) === x)
// 01100
// 01000
// 01000