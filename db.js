const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
// for hide unwanted text from terinal 
mongoose.set('strictQuery', false);
mongoose
  .connect(
    "mongodb+srv://devanshji:chutiyahaiji@whatsapp.dwx0zbh.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((a) => {
    console.log(`connected ${a}`);
  })
  .catch((e) => {
    console.log(e);
  });



const log = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim:true,
    
    validat(v) {
      if (validator.isEmail(v)) {
        throw new Error("wrong email");
      }
    },
    
    unique: true,
    required: true,
  },
  number: {
    type: Number,
    
    validat(v) {
      if (validator.isNumber(v)) {
        throw new Error("wrong number");
      }
    },

    unique:true,
    required: true,

  },

  name: {
    type: String,
    lowercase: true,
    required: true,
    trim : true
  },
  password : {
    type:String,
    required:true,
  }
});


const chat = new mongoose.Schema({
    chat1:{
        type:String,
        lowercase : true,
        trim : true
    },
    chat2 : {
        type : String,
        towercase : true,
        trim  : true
    } 
})

// log.pre('save',async function(){
//   let salt = bcrypt.genSaltSync(10);
//   this.password = await bcrypt.hashSync(this.password,salt);
// })

const login = new mongoose.model('details',log);
const chating = new mongoose.model('chats',chat)

module.exports = {login,chating}; 