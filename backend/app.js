import express from 'express'
import cors from "cors"
import mongoose from "mongoose"
import { autoIncrement } from 'mongoose-plugin-autoinc';
import bcrypt from 'bcrypt';

 
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
// ${process.env.REACT_APP_URL}
// mongodb+srv://prateek_bd:prateek1234@cluster0.onsao.mongodb.net/
// mongodb+srv://${process.env.REACT_APP_ID}@cluster0.onsao.mongodb.net/
console.log(process.env.REACT_APP_ID)
// mongoose.connect(`mongodb+srv://${process.env.REACT_APP_ID}@cluster0.onsao.mongodb.net/`, {
mongoose.connect(`mongodb+srv://prateek_bd:prateek1234@cluster0.onsao.mongodb.net/locofast`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err)=>{
    if(err) console.log(err);  
    else
    console.log("Database Connected");
})
   
const userSchema = new mongoose.Schema({
    email: String,
    password: String
})   
 

const User = new mongoose.model("User", userSchema)
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    userid: String
})
blogSchema.plugin(autoIncrement,'user');
const Blog = new mongoose.model("blog", blogSchema)
 

app.post("/create", (req,res)=>{
    const { id, title, author, content, userid} = req.body
    // res.send({message: "Added", candidate: candidate})
    const blog = new Blog({
        title: title,
        author: author,
        content: content,
        userid: userid
    })
    blog.save(err=>{  
        if(err) {
            res.send(err);
            
        } else {
            console.log(req.body)
            res.send({ message: "Successfully Added", blog : blog})
            // res.json(candidate);  
        }
    })
    // console.log(req.body); 
})

app.get("/homepage/", async (req,res) => {
    let can = await Blog.find();
    res.send(can);
})

app.get("/homepage/:id/search/:key", async (req,res) => {
    const {id,key} = req.params
    console.log(req.params)
    let can = await Blog.find({ title: key});
    res.send(can);
    console.log(can);
})

app.get("/edit/:id/:blogid", async (req,res) => {
    const {id,blogid} = req.params
    let cand = await Blog.findOne({ _id : blogid});
    if(cand.userid===id) {
         res.send(cand)
    } else {
        res.send({message:"Not Allowed"})
    }
})
app.put("/edit/:id/:blogid", async (req,res) => {  
    const user = req.body
    const {id,blogid} = req.params
    console.log(blogid);
    let cand = await Blog.findOne({ _id : blogid});
    if(cand.userid===id) {
        const editblog = new Blog(user)
         let blog = await Blog.updateOne({ _id : blogid}, editblog);
         res.send({ message: "Successfully Updated", blog})
    } else {
        res.send({message:"Not Allowed"})
    }
})

app.get("/homepage/:id/:blogid", async (req,res) => {
    const {id, blogid} = req.params
    // console.log(req.params);
    let cand = await Blog.findOne({ _id : blogid});
    res.send(cand);
})


app.delete("/homepage/:id/:blogid", async (req,res) => { 
    const {id, blogid} = req.params
    // console.log(req.params);
    let cand = await Blog.findOne({ _id : blogid});
    if(cand.userid===id || id=="620547bf237c6469d9aa0f16") { 
        await Blog.deleteOne({ _id: blogid});
         res.send({ message: "Successfully deleted"})
    } else {
        res.send({message: "Not Allowed"})
    }
    
})


app.post("/login", (req,res)=>{ 
    const {email, password} = req.body
    User.findOne({ email: email }, (err, user) => {
        if(user) {
            if(bcrypt.compareSync(password,user.password)) {
                // console.log("password matched")
                res.send({message: "Login Successfull", user: user })
            } else {
                // console.log("wrong password")
                res.send({message: "Wrong Password"})
            } 
        } else {  
            // console.log("not registered")
            res.send({message: "User not registered"}) 
        }
    
    })
})



app.post("/", (req,res)=> {
    // console.log(req.body)
    const {email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registered"})
        } else {
            
            let hash = bcrypt.hashSync(req.body.password, 10);
            const user = new User({
                email,
                password : hash
            }) 
            user.save(err=>{
                if(err) {
                    res.send(err);
                } else {
                   
                    res.send({ message: "Successfully Registered Please login"})
                }
            })
        }
    })
})

 


app.listen(9000,()=>{
    console.log("started at port 9000");
})