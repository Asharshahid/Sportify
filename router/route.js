import {Router} from "express";
const router = Router()
import * as controller from '../controller/controller.js'
import authenticateToken from "../middleware/authenticateToken.js";



router.get("/testpage", controller.TestPage)
router.get("/", controller.check)


        //_______________Authentication______________//

// Create User   
router.post("/register", controller.register)

// Login User
router.post("/login", controller.login)

// Logout User
// router.get("/logout", controller.logout)

        
             //_______________Other Routes Section______________//

// Get User
router.get("/getuser/:id",authenticateToken ,controller.getUser)

// Get All User
router.get("/getalluser",authenticateToken ,controller.getAllUser)

// Get Login User
router.get("/getloginuser",authenticateToken ,controller.getLoginUser)

// Update Login User
router.put("/updateloginuser",authenticateToken ,controller.updateLoginUser)

// Follow Unfollow
router.get("/followunfollow/:id",authenticateToken ,controller.followUnfollow)

// Create Post
router.post("/createpost",authenticateToken ,controller.createPost)

// Delete Post
router.delete("/deletepost/:id",authenticateToken ,controller.deletePost)

// Get All Post Login User
router.get("/getallpost",authenticateToken ,controller.getAllPost)

// Get All Post By User Id
router.get("/getallpostbyid/:id",authenticateToken ,controller.getAllPostUserId)









export default router;
