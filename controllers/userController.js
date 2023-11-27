const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  
};

//register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 5) {
    res.status(400);
    throw new Error("Password must be up to 5 characters");
  }

  // Check if user email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  
    


  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  //Generate Token
  const token = generateToken(user._id);

  //send HTTP-only cookie
  res.cookie("token", token,{
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 *86400), //1 day
      sameSite: "none",
      secure: true,
  })



  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//login user
const loginUser = asyncHandler( async (req, res) => {
 
const {email, password} = req.body;

//validate request
if(!email || !password){
  res.status(400);
  throw new Error("Please add email and password");
}

//check if user exist
const user = await user.findOne({email})

if(!user){
  res.status(400);
  throw new Error("User not found, plese sing up");
}
//user exists, check if password is correct
const passwordIsCorrect = await bcrypt.compare(password, user.password);

if(user && passwordIsCorrect){
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });

}else{
  res.status(400);
  throw new Error("Invalid email or password");
}

});
// logout user
  const logout = asyncHandler(async(req, res) => {
    res.cookie("token", "",{
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 *86400), //1 day
      sameSite: "none",
      secure: true,
  })
  return res.status(200).json({message: "Successfully logged out"});
  });

  //Get user
  const getUser = asyncHandler(async(req, res) => {
    res.send("get user data");
  });


module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
};
