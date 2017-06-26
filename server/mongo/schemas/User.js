import { Model, Schema } from "mongo/bindings";

const UserSchema = new Schema({
    name: String
});

export const User = Model("user", UserSchema);
