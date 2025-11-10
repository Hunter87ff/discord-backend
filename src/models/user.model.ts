import Helper from '@/utils/helper';
import {Schema, model, Document} from 'mongoose';

// Interface for User Document
export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    username: string;
    global_name: string;
    avatar: string;
    preference: string;
    status: string;
    email: string;
    otp: string;
    is_verified: boolean;
    password: string;
    token: string;
    phone: number;
    createdAt?: Date;
    updatedAt?: Date;
}



// User Schema
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be unique'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    global_name: {
        type: String,
        required: [true, 'Global name is required'],
        trim: true,
        maxlength: [50, 'Global name cannot exceed 50 characters']
    },
    avatar: {
        type: String,
        default: '',
        trim: true
    },
    preference: {
        type: String,
        default: '',
        trim: true
    },
    status: {
        type: String,
        enum: ['online', 'offline', 'away', 'busy', 'invisible'],
        default: 'offline'
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
            'Please provide a valid email address'
        ]
    },
    is_verified: {
        type: Boolean,
        default: false
    },

    otp : {
        type: String,
        default : () => Helper.generateOTP()
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    token : {
        type : String,
        required : [true, 'Token is required'],
    },
    phone: {
        type: Number,
        unique: [true, 'Phone number must be unique'],
        sparse: true, // Allows null values while maintaining uniqueness
        validate: {
            validator: function(v: number) {
                return v === null || v === undefined || /^\d{10,15}$/.test(v.toString());
            },
            message: 'Phone number must be between 10 and 15 digits'
        }
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false // __v
});


userSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await Helper.hash(this.password);
    next();
});


// Export the User model
const UserModel = model<IUser>('User', userSchema);



export default UserModel;