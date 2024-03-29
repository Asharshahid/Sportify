import User from '../model/userModel.js'
import Post from '../model/postModel.js'
import jwt from 'jsonwebtoken'

// ### Test page


export async function TestPage(req, res){
    try{
        res.json("Welcome to my application")
    }
    catch(error){
        res.status(501).send(error)
    }
}
export async function check(req, res){
    try{
        const token = await jwt.sign({_id:"65dc5e5ff020baebdaad8515"}, 'ubit123456789');
                res.cookie("jwt",token,{
                    // expires:new Date(Date.now()+5000),
                    httpOnly:true
                    // domain: 'sportify-plyj.onrender.com',
                    // path: '/',
                    // sameSite: 'None'
                })
        res.json("Welcome to Sportify Backend After cors added")
    }
    catch(error){
        res.status(501).send(error)
    }
}
             
                    //___________ AUTHENTICATION _____________// 


// ### REGISTER USER

export async function register(req, res){
    try {
        const {name,email,password,player_type,country,city,area,wathsapp,status}= req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({name,email,password,player_type,country,city,area,wathsapp,status});
        await newUser.save();  
        res.send(newUser);
        
    } 
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}


// ### LOGIN USER

export async function login(req, res){
    try{
        const {email,password} = req.body;
        const existUser = await User.findOne({email})
        if(existUser){
            if(existUser.password===password){
                const token = jwt.sign({_id:existUser._id}, 'ubit123456789');
                // res.cookie("jwt",token,{
                //     // expires:new Date(Date.now()+5000),
                //     httpOnly:true
                // })

                res.status(201).send({existUser,token})
            }
            else{
                res.status(501).send("Invalid details")
            }   
        }
        else{
            res.status(501).send("Invalid details")
        } 
    } 
    catch(error){
        res.status(500).send(error)
    }
}

// ### UPDATE USER DATA

export async function updateLoginUser(req, res){
    try {
        const {name,password,player_type,country,city,area,wathsapp,status}= req.body;
        // const token = req.header("jwt") || req.cookies.jwt ;
        // const verify = jwt.verify(token, "ubit123456789");
        const userId = req.user._id;
        const updateUser = await User.findByIdAndUpdate({_id:userId},{$set:req.body},{new:true})
        res.status(201).send(updateUser);
        
    } 
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

 
// ### Follow_UNFOLLOW

export async function followUnfollow(req, res){
    try{
        const searchUserId = req.params.id;
        const findUser = await User.findById(searchUserId);
        const follow = findUser.follower;
        // const token = req.header("jwt") || req.cookies.jwt;
        // const verify = jwt.verify(token,'ubit123456789');
        const userId = req.user._id;

        const index = follow.indexOf(userId);
        if (index !== -1) {
            // a is present, so remove it
            follow.splice(index, 1);
            console.log("unfollow");
          } else {
            // a is not present, so add it
            follow.push(userId);
            console.log("follow:", follow);
          }
          const updateFollow = await User.findByIdAndUpdate({_id:searchUserId},{$set:{follower:follow}},{new:true})
          res.status(201).send({UpdateFollow:"yes", updateFollow})
    }
    catch (error) {
        console.error('Error creating result:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}


// ### Get Login User

export async function getLoginUser(req, res){
    try {
        // const token = req.header("jwt") || req.cookies.jwt ;
        // const verify = jwt.verify(token, "ubit123456789");
        const userId = req.user._id;
        const findUser = await User.findById(userId);
        if (findUser) {
            res.status(201).send(findUser);
        }
        else{
            res.status(501).json("Result not found")
        }       
    } 
    catch (error) {
        console.error('Error creating result:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

// GET USER

export async function getUser(req, res){
    try{
        const userId = req.params.id;
        const findUser = await User.findById(userId)
        res.status(201).send(findUser)

    }
    catch(err){
        res.status(404).send(err)
    }
}

// GET ALL USER

export async function getAllUser(req, res){
    try{
        // const token = req.header("jwt") || req.cookies.jwt ;
        // const verify = jwt.verify(token, "ubit123456789");
        const userId = req.user._id;
        const findAllUser = await User.find({ _id: { $ne: userId } });
        res.status(201).send(findAllUser)

    }
    catch(err){
        res.status(404).send(err)
    }
}

// LOGOUT USER

export async function logout(req,res){
   try{
    //    const token = res.clearCookie("jwt");
       res.status(200).json("Yes token delete")
   }
   catch(err){
       res.status(404).send(err)
   }
}


// Create Post

export async function createPost(req, res){
    try{
        let w3_R50=0;
        let w5_R100=0;
        const {match_format,score_wicket}= req.body;
        // const token = req.header("jwt") || req.cookies.jwt ;
        // const verify = jwt.verify(token, "ubit123456789");
        const userId = req.user._id;
        const getLoginUser = await User.findById({_id:userId})
        if(getLoginUser.player_type=="Batsman"){
            if(score_wicket >= 100){
                w5_R100=1
            }
            else if(score_wicket >= 50){
                w3_R50=1
            }
            else{
                w5_R100=0
                w3_R50=0
            }
        }
        else{
            if(score_wicket >= 5){
                w5_R100=1
            }
            else if(score_wicket >= 3){
                w3_R50=1
            }
            else{
                w5_R100=0
                w3_R50=0
            }
        }
        const newPost = new Post({user_id:userId, match_format, score_wicket,threeWicket_fiftyRun:w3_R50,fiveWicket_hundredRun:w5_R100})
        await newPost.save();
        res.status(201).send(newPost)

    }
    catch(err){
        res.status(404).send(err)
    }
}


// Get All Post Login User

export async function getAllPost(req, res){
    try{
        // const token = req.header("jwt") || req.cookies.jwt ;
        // const verify = jwt.verify(token, "ubit123456789");
        const userId = req.user._id;
        const allPost = await Post.find({user_id:userId})
        res.status(201).send(allPost)

    }
    catch(err){
        res.status(404).send(err)
    }
}

// Get All Post BY User Id

export async function getAllPostUserId(req, res){
    try{
        const userId = req.params.id;
        const allPost = await Post.find({user_id:userId})
        res.status(201).send(allPost)

    }
    catch(err){
        res.status(404).send(err)
    }
}

// Delete Post

export async function deletePost(req, res){
    try{
        const postId = req.params.id;
        const deletePost = await Post.findByIdAndDelete(postId)
        res.status(201).send(deletePost)

    }
    catch(err){
        res.status(404).send(err)
    }
}
