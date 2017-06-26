import { Model, Schema } from "mongo/bindings";

const UserSchema = new Schema({
    name: String,
    password: String
});

export const User = Model("user", UserSchema);
