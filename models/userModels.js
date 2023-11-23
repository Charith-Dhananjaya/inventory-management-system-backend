const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [5, "password must upto 5 characters"],
      //maxLength: [20, "password must not be more than 20 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+234",
    },

    bio: {
      type: String,
      maxLength: [250, "bio must not be more than 250 characters"],
      default: "bio",
    },
  },
  {
    timestamps: true,
  }
);

  //encrypt password before save to db
userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    return next();
  }

  //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;
