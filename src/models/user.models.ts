import mongoose, {Schema} from "mongoose";

const enum status {
    'rejected',
    'pending',
    'verified'
}

// interface to build perfect userSchema
interface UserVerification {
    verifyToken: string
    verifyTokenExpiry: Date
    verificationStatus: status
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
        minlength: 2
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: String,
    phoneNumber: String,
    role: String
}, { timestamps: true});


const User = mongoose.models.User || 
    mongoose.model("User", userSchema);


export default User;