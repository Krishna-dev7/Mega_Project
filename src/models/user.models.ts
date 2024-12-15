import mongoose, {Schema} from "mongoose";

// interface to build perfect userSchema
interface UserVerification {
    verifyCode: string
    isVerified: boolean
    verifyCodeExpiry: Date
    forgotPasswordToken: string
    forgotPasswordTokenExpiry: Date
}

interface UserSchema extends Schema, UserVerification {
    username: string
    fullname: string
    email: string
    password: string
    avatar: string
    phoneNumber: string
    role: ("user" | "seller")
}

const userSchema = new Schema<UserSchema>({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: String,
    phoneNumber: String,
    role: String,
    verifyCode: String,
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    verifyCodeExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
}, { timestamps: true});


const User = mongoose.models.User || 
    mongoose.model<UserSchema>("User", userSchema);


export default User;
export type {
    UserSchema,
    UserVerification,
};