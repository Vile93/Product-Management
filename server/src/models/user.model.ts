import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const UserModel = mongoose.model('User', userSchema);
