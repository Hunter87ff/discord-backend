import bcrypt from 'bcryptjs';

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
            return false;
        }
    }
}

export default Helper;
