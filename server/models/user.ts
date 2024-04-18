"use strict"

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema : any = new Schema (
    {
        DisplayName : String,
        EmailAddress: String,
        Username: String,
        Created: {
            types: Date,
            default: Date.now()

        },


    },
    {
        collection: "users"
    }
);

UserSchema.plugin(passportLocalMongoose);
const Model = mongoose.model("User", UserSchema);

declare globle
{
    export type UserDocument = mongoose.Document &
        {
            user: String,
            EmailAddress: String
        }
}
export default Model;