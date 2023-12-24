import Post from "../models/Posts.js"
import User from "../models/User.js"

/* CREAT POST */

export const createPost=async (req,res)=>{
    try {
        const {userId,decription,picturePath}=req.params;
        const user=User.findById(userId);
        const newPost =new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            decription,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[],
        });
        await newPost.save();
        const post=await post.find();
        res.status(201).json(post);
        
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const getFeedPost=async(req,res)=>{
    try {
        const post =await Post.find()
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserPost=async(req,res)=>{
    try {
        
        const {userId}=req.params;
        const post =await Post.find({userId})
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}

/* Update */


export const likePost=async(req,res)=>{
    try {
        
        const {id}= req.params;
        const post= await Post.findById(id);
        const {userId}= req.body;
        const isLiked=post.likes.gey(userId);
        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId,true)
        }

        const updatedPost= await Post.findByIdAndUpdate(
            id,
            {likes:post.likes},
            {new :true},
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}