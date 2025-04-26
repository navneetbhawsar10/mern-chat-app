const mongoose =  require('mongoose');
//data model of chat
const chatModel = mongoose.Schema(
    {
        chatName:{type:String,trim:true},//trim means of spacing before and after 
        isGroupChat :{type : Boolean ,default:false},
        users:[
            {
                type:mongoose.Schema.Types.ObjectId,//contain id of perticular user (for single user)
                ref:"User",//reference of user model
            }, ],

            latestMessage:{
                type:mongoose.Schema.Types.ObjectId,//contain id of perticular user (for single user)
                ref:"Message",//reference of messeages
            },
            groupAdmin:
            {
                type:mongoose.Schema.Types.ObjectId,//contain id of perticular user (for single user) which is admin
                ref:"User",//reference of messeages
            }
    },
    //when a chat is added timestamp is also added
    {
        timestamps:true,
    }
);


const Chat=mongoose.model("Chat",chatModel);

module.exports= Chat;