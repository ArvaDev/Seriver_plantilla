import mongoose, { Schema, Document, model } from "mongoose";

interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    online: boolean;
    token: string;
    messages: mongoose.Types.ObjectId[];
    contacts: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
    username: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    online: { type: Boolean, default: false },
    token: { type: String, default: "" },
    messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
    contacts: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true
});

const UserModel = model<IUser>("User", UserSchema);
export default UserModel;
