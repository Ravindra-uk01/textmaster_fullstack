import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const {Schema, Types, model} = mongoose;

const user_schema = new Schema({
    first_name:{
        type: String,
        trim: true
    },
    last_name:{
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required : [true, "Email is Required"],
        // lowercase : true,
        validate: [validator.isEmail, "Please provide a valid email "]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: 8,
        select: false
    },
    confirm_password: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            // this works on Create and save !!
            validator: function(el){
                return el === this.password;
            },
            message: 'passwords are not same! '
        }
    },
    phone: {
        type: Number,
        min: 1000000000, 
        max: 9999999999
    },
    bio:{
        type: String
    },
    photo:{
        type : String,
    },
    display_name:{
        type: String,
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    account_status:{
        type: String,
        enum: ['active', "inActive"],
        default: 'active'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpiresIn : Date

},{
    timestamps: true
});

user_schema.pre('save', async function(next){
    if(!this.last_name){
        this.display_name = this.first_name;
    }else 
        this.display_name = `${this.first_name} ${this.last_name}`;
})

// this function runs when the password is changed
user_schema.pre('save', async function(next){

    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.confirm_password = undefined;
    next();
})

user_schema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew)
       return next();

    this.passwordChangedAt = Date.now()- 1000;
    next();
})

user_schema.methods.checkPassword = async function checkPassword(candidatePassword, userPassword) {

    return await bcrypt.compare(candidatePassword, userPassword);
}

user_schema.methods.changedPasswordAfter = function(jwtIssuedAt){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() /1000, 10);
        return (jwtIssuedAt < changedTimeStamp);
    }

    return false;
}

user_schema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpiresIn = Date.now()+ 10*60*1000;

    return resetToken;
}



const User = model("User", user_schema);
export default User;


