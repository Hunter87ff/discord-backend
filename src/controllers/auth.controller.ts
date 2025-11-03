import type { Request, Response } from 'express';


class AuthController {

    static async login(req: Request, res: Response): Promise<void> {
        res.status(200).json({ message: 'Login successful' });
    }
}

// const sm = 2048
// const cpt = 1n << 35n

// const cperm = (1n << 35n) + BigInt(sm)

// console.log("is cpt allowed:", (cperm & cpt) === cpt)
