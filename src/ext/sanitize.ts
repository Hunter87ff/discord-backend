export class Sanitizer {
    public static html(input: string): string {
        return String(input)
            .replace(/<[^>]*>/g, '')
            .trim(); // Remove HTML tags
    }

    static string(input: string): string {
        // Remove leading and trailing whitespace, and replace multiple spaces with a single space
        return input.trim().replace(/\s+/g, ' ');
    }

    static email(input: string): string {
        // Basic email sanitization to remove spaces and convert to lowercase

        // check if input is a valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
            throw new Error('Invalid email format');
        }
        
        // remove the pattern where users add + tags in email
        input = input.replace(/\+[^@]*/, '');
        return input.trim().toLowerCase();
    }

    static password(input: string): string {
        // Basic password sanitization (e.g., trimming whitespace)
        return input.trim();
    }
    static number(input: number): number {
        // Ensure the input is a number and return it as is
        if (typeof input !== 'number' || isNaN(input)) {
            throw new Error('Invalid number input');
        }
        return input;
    }
}

// const e = "something+test@example.com"
// const sanitizedEmail = Sanitizer.email(e);
// console.log(sanitizedEmail); // Output: "something@example.com"
