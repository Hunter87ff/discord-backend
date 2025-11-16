export default class EmailTemplates {

    static sendOtpTemplate(otp: string): string {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #ffffff; color: #333333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e0e0e0; }
        .header { background-color: #5865F2; color: #ffffff; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button { display: inline-block; padding: 10px 20px; background-color: #5865F2; color: #ffffff; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .caution { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; margin: 20px 0; border-radius: 5px; color: #856404; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>OTP Verification</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>You have requested to verify your account. Your OTP is <strong>${otp}</strong>. Please use this to complete the verification process.</p>
            
            <div class="caution">
                <strong>Caution:</strong> If you did not request this verification, please do not click the link and ignore this email. Do not share this link with anyone.
            </div>
            <p>If you have any questions, feel free to contact our support team.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Our Discord-like Service. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `;
    }

    static welcomeEmailTemplate(userName: string): string {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Service</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #ffffff; color: #333333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e0e0e0; }
        .header { background-color: #5865F2; color: #ffffff; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button { display: inline-block; padding: 10px 20px; background-color: #5865F2; color: #ffffff; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Our Community!</h1>
        </div>
        <div class="content">
            <p>Hello ${userName},</p>
            <p>Welcome to our Discord-like platform! We're thrilled to have you join our community.</p>
            <p>Our service allows you to connect with friends, join servers, and enjoy seamless communication through text, voice, and video. Whether you're here to chat with friends, collaborate on projects, or discover new communities, we've got you covered.</p>
            <p>Get started by exploring your dashboard and joining some servers. If you need any help, our support team is here for you.</p>
            <a href="#" class="button">Explore Now</a>
            <p>Thank you for choosing us. Let's build something amazing together!</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Our Discord-like Service. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `;
    }
}