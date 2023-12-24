import User from "../models/User.js";

export const getUser= async(req,res)=>{

    try{
        const{id}=req.param;
        const user=await User.findById(id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(404).json({err:err.message})
    }
}


export const getUserFriends= async (req,res)=>{

    try{
    const{id}=req.params;
    const user=await User.findById(id);
    const friend = await Promise.all(
        user.friend.map((id)=>User.findById(id))
    )
    const formattedFriends=friend.map(
        ( {
            _id,
            firstName,
            lastName,
            location,
            occupation,
            picturePath
        })=>{
            return {
                _id,
            firstName,
            lastName,
            location,
            occupation,
            picturePath
            }
        }
    )

    res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({err:err.message}) 
    }
}

/* Update */


export const addRemoveFriend=async(req,res)=>{
    try{

        const {id,friendId}= req.params;
        const user =await User.findById(id);
        const friend =await User.findById(friendId);
        if(user.friends.includes(friendId)){
            user.friends.filter((id)=>id!==friendId);
            friend.friends.filter((id)=>id!==id);
        }
        else{
            user.friend.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
          );
          const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );

          res.status(200).json(formattedFriends);

    }
    catch(err){
        res.status(404).json({ message: err.message });

    }
}