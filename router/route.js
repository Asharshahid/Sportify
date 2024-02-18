import {Router} from "express";
const router = Router()
import * as controller from '../controller/controller.js'
import middleware from "../middleware/middleware.js";



router.get("/testpage", controller.TestPage)

        //_______________Authentication______________//

// Create User   
router.post("/register", controller.register)

// Login User
router.post("/login", controller.login)

// Logout User
router.get("/logout", controller.logout)

        
             //_______________Other Routes Section______________//

// Get Login User
router.get("/getuser/:id",middleware ,controller.getUser)

// Get Login User
router.get("/getloginuser",middleware ,controller.getLoginUser)

// Update Login User
router.put("/updateloginuser",middleware ,controller.updateLoginUser)

// Follow Unfollow
router.get("/followunfollow/:id",middleware ,controller.followUnfollow)

// Create Post
router.post("/createpost",middleware ,controller.createPost)

// Delete Post
router.delete("/deletepost/:id",middleware ,controller.deletePost)

// Get All Post Login User
router.get("/getallpost",middleware ,controller.getAllPost)

// Delete Post
// router.post("")








export default router;