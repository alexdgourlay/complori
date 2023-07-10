import userModel, { User } from "../models/user.model";

class UserService {

    create(user: User) {
        const newUser = new userModel(user);
        return newUser.save();
    }

    getAll() {
        return userModel.find({});
    }
}

export default UserService; 