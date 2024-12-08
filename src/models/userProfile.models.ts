import mongoose, {Schema, Types} from "mongoose";

interface UserProfileSchema extends Schema {
    userId: Types.ObjectId
    address: string
    totalSpent: number 
}


const userProfileSchema = new Schema<UserProfileSchema>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    totalSpent: {
        type: Number,
        default: 0
    }
});

const UserProfile = mongoose.models.UserProfile 
    || mongoose.model<UserProfileSchema>('UserProfile', userProfileSchema);

export default UserProfile;