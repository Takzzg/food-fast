import mongoose from 'mongoose'

const favoritesSchema= new mongoose.Schema({ 
  userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
  products:{
        type:Array, 
        ref:"Products"
   }
});

const Favorites = mongoose.model("Favorites",favoritesSchema)
export default Favorites;