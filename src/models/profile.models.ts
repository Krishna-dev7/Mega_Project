import mongoose, { Schema, Document, Types } from "mongoose";

interface IProfile extends Document  {
	_id: Types.ObjectId
	owner: Types.ObjectId;
	avatar: string
	address: string
	phoneNumber: string
}

const profileSchema = new Schema<IProfile>(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		avatar: String,
		address: String,
		phoneNumber: {
			type: String,
			min: [10, 'must be 10 character long'],
			max: [10, 'must be 10 character long']
		}
	},
	{ timestamps: true },
);

const Profile =
	mongoose.models.Profile ||
	mongoose.model("Profile", profileSchema);

export default Profile;
export type {
	IProfile
}