
import { logger } from "@/ext/logger";
import { emailConfig } from "@/config";
import { createTransport } from "nodemailer";
import EmailTemplates from "@/assets/email-templates";


const transport = () => {
    return createTransport(emailConfig.creds);
};


interface SendMailOptions {
    from: string;
    to: string;
    subject: string;
    html?: string;
    text?: string;
}


export default class MailService {

    static async sendEmail(ctx: SendMailOptions) {
        const mailTransport = transport();
        await mailTransport.sendMail({
            from: ctx.from,
            to: ctx.to,
            subject: ctx.subject,
            html: ctx.html,
            text: ctx.text,
        });
    }

    static sendOtp(to: string, otp: string) {
        try {
            const _html = EmailTemplates.sendOtpTemplate(otp);
            return this.sendEmail({
                from: emailConfig.from.support,
                to: to,
                subject: "OTP Verification",
                html: _html
            });
        } catch (error) {
            logger.debug("MailService.sendOtp error:", error);
            return null;
        }
    }

    static sendWelcomeEmail(to: string, userName: string) {
        try {
            const _html = EmailTemplates.welcomeEmailTemplate(userName);
            return this.sendEmail({
                from: emailConfig.from.support,
                to: to,
                subject: "Welcome to Discord-like Service",
                html: _html
            });
        } catch (error) {
            logger.debug("MailService.sendWelcomeEmail error:", error);
            return null;
        }
    }
}