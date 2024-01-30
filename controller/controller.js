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
             
                    //___________ AUTHENTICATION _____________// 


// ### REGISTER USER

export async function register(req, res){
    try {
        const {name,email,password}= req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({name, email, password });
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
                const token = await jwt.sign({_id:existUser._id}, 'ubit123456789');
                res.cookie("jwt",token,{
                    // expires:new Date(Date.now()+5000),
                    httpOnly:true
                })

                res.status(201).send(existUser)
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
        const token = req.header("jwt") || req.cookies.jwt ;
        const verify = jwt.verify(token, "ubit123456789");
        const updateUser = await User.findByIdAndUpdate({_id:verify._id},{$set:req.body},{new:true})
        res.status(201).send(updateUser);
        
    } 
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}





           //___________ STUDENTS RESULTS _____________// 

// ### ADD STUDENT RESULT

// export async function addResult(req, res){
//     try {
//         const {seat_number,course_number,theory,lab,total_marks}= req.body;
        
//         const existingResult = await Result.findOne({ $and: [{ seat_number }, { course_number }] });
//         if (existingResult) {
//             return res.status(400).json({ message: 'Result already exists' });
//         }
//         const newResult = new Result({ seat_number, course_number, theory, lab, total_marks });
//         await newResult.save();  
//         res.status(201).send(newResult);
        
        
//     } 
//     catch (error) {
//         console.error('Error creating result:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
// }

// ### Follow_UNFOLLOW

export async function followUnfollow(req, res){
    try{
        const searchUserId = req.params.id;
        const findUser = await User.findById(searchUserId);
        const follow = findUser.follower;
        const token = req.header("jwt") || req.cookies.jwt;
        const verify = jwt.verify(token,'ubit123456789');

        const index = follow.indexOf(verify._id);
        if (index !== -1) {
            // a is present, so remove it
            follow.splice(index, 1);
            console.log("unfollow");
          } else {
            // a is not present, so add it
            follow.push(verify._id);
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
        const token = req.header("jwt") || req.cookies.jwt ;
        const verify = jwt.verify(token, "ubit123456789");
        const findUser = await User.findById(verify._id);
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

// LOGOUT USER
export async function logout(req,res){
   try{
       const token = res.clearCookie("jwt");
       res.status(200).json("Yes token delete")
   }
   catch(err){
       res.status(404).send(err)
   }
}



// Create Post

export async function createPost(req, res){
    try{
        const {match_format,score_wicket}= req.body;
        const token = req.header("jwt") || req.cookies.jwt ;
        const verify = jwt.verify(token, "ubit123456789");
        const newPost = new Post({user_id:verify._id, match_format, score_wicket})
        await newPost.save();
        console.log(match_format);
        res.status(201).send(newPost)

    }
    catch(err){
        res.status(404).send(err)
    }
}


// Get Post




// Delete Post