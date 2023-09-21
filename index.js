var con = require("./backend/connection");
var express = require("express");
var app = express();
var session = require("express-session")
var cookieParser = require("cookie-parser")
"use strict";
const nodemailer = require("nodemailer");

app.use(cookieParser())
app.use(session({secret:"admin",saveUninitialized: true, resave:true}))
app.engine("html", require("ejs").renderFile);
app.set("view engine","html")


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "hms.india2023@gmail.com",
    pass: "hwlbjogxjnrxqbgk"
  }
});

function betweenRandomNumber(min, max) {  
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}



con.connect(function(error){
    if(error) throw error;
})

// read information
var bodyParser = require("body-parser");
const e = require("express");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

 __dirname += "/frontend/views"

// getting assests
app.use('/frontend', express.static('frontend'));

// index page GET
app.get(["/","/personaltraining.html"],function(req,res){
    // res.sendFile(__dirname+"/home.html");
    console.log(req.session.user) 
    if(req.session.user )
    {
        if(req.session.user == "-10")
        {
            req.session.user = -10;
            console.log(req.session.user)
            res.render(__dirname+"/admin.html")
        }
        else if(req.session.loginuser == "trainer"){
            console.log("trainer login")
            var getTrainerData = "SELECT * FROM trainer WHERE id = '"+req.session.user+"' "
            con.query(getTrainerData,function(error,result){
                if (error) throw error;
                if(result.length){

                    // Correct Credentials
                    req.session.user = result[0].id;
                    req.session.loginuser = "trainer";
                    console.log(req.session.user)

                    // res.render(__dirname+"/Trainer.html")
                    res.render(__dirname+"/Trainer.html",{name:result[0].name,data:1})
                        
                }
                else{
                    // fake user
                    req.session.user = -1
                    res.render(__dirname+"/login.html",{fakeuser:"1"})
                }
            })
        }
        else {
            var getUser = "SELECT * FROM members WHERE id ='"+req.session.user+"'";
            con.query(getUser,function(error,result){
                if (error) throw error;
                if(result.length){

                    var getUser = "SELECT * FROM register WHERE id ='"+req.session.user+"'";
                    con.query(getUser,function(error,result){
                        if (error) throw error;
                        if(result.length){

                            // go to member page 
                            req.session.user = req.session.user 
                            res.render(__dirname+"/member.html",{name:result[0].firstname,data:1,type:result[0].personaltraining,userid:req.session.user})
                        }
                        else{
                            // go to home page Login successful 
                            req.session.user = req.session.user 
                            res.render(__dirname+"/home.html",{data:1})
                        }
                    })

                }
                else{
                    // welcome page
                    
                        res.sendFile(__dirname+"/home.html");
                    
                }
            })
        }
    }
    else{
        // welcome page
        res.sendFile(__dirname+"/home.html");
    }

    // res.render(__dirname+"/home.html",{ data:0})
})

// index page GET
app.get(["/signup.html"],function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

// LOGOUT page GET
app.get(["/logout.html"],function(req,res){
    req.session.user = -1
    res.render(__dirname+"/login.html",{fakeuser:"0"});
})

// login page GET
app.get("/login.html",function(req,res){
    res.render(__dirname+"/login.html",{fakeuser:"0"});
    // console.log("This is current session : "+res.session)
})

// logincheck page POST
app.post("/checklogin.html",function(req,res){
    // check user session 
    
    email = req.body.email
    pass = req.body.password
    type = req.body.usertype // memeber  --- trainer ---  admin
    

    if(type == "member")
    {
        var checkCredentials = "SELECT * FROM members WHERE email = '"+email+"' AND password = '"+pass+"' AND verified = '1'"
        con.query(checkCredentials,function(error,result){
            if (error) throw error;
            if(result.length){

                // Correct Credentials
                req.session.user = result[0].id;
                console.log(req.session.user)

                var getUser = "SELECT * FROM register WHERE id ='"+req.session.user+"'";
                con.query(getUser,function(error,result){
                    if (error) throw error;
                    if(result.length){

                        // go to member page - User already registered 
                        req.session.user = req.session.user 
                        res.render(__dirname+"/member.html",{name:result[0].firstname,data:1,type:result[0].personaltraining,userid:req.session.user})
                    }
                    else{
                        // go to home page Login successful 
                        req.session.user = req.session.user 
                        res.render(__dirname+"/home.html",{data:1})
                    }
                })
                
                
            }
            else{
                // fake user
                req.session.user = -1
                res.render(__dirname+"/login.html",{fakeuser:"1"})
            }
        })

    }
    else if(type == "admin"){
        console.log("admin login")
        var checkCredentials = "SELECT * FROM admin WHERE email = '"+email+"' AND password = '"+pass+"' "
        con.query(checkCredentials,function(error,result){
            if (error) throw error;
            if(result.length){

                // Correct Credentials
                req.session.user = result[0].id;
                console.log(req.session.user)

                res.render(__dirname+"/admin.html")
                    
            }
            else{
                // fake user
                req.session.user = -1
                res.render(__dirname+"/login.html",{fakeuser:"1"})
            }
        })
    }
    else if(type == "trainer"){
        console.log("trainer login")
        var checkCredentials = "SELECT * FROM trainer WHERE email = '"+email+"' AND password = '"+pass+"' "
        con.query(checkCredentials,function(error,result){
            if (error) throw error;
            if(result.length){

                // Correct Credentials
                req.session.user = result[0].id;
                req.session.loginuser = "trainer";
                console.log(req.session.user)

                // res.render(__dirname+"/Trainer.html")
                res.render(__dirname+"/Trainer.html",{name:result[0].name,data:1})
                    
            }
            else{
                // fake user
                req.session.user = -1
                res.render(__dirname+"/login.html",{fakeuser:"1"})
            }
        })
    }
    else{
        res.sendFile(__dirname+"/home.html")
    }
    
})

// login page GET
app.get("/checklogin.html",function(req,res){

    // req.session.user = result[0].id;
    console.log("user data : ")
    console.log(req.session) 
    if(req.session.user)
    {
        if(req.session.user == "-10")
        {
            req.session.user = -10;
            console.log(req.session.user)
            res.render(__dirname+"/admin.html")
        }
        else if(req.session.loginuser == "trainer"){
            console.log("trainer login")
            var getTrainerData = "SELECT * FROM trainer WHERE id = '"+req.session.user+"' "
            con.query(getTrainerData,function(error,result){
                if (error) throw error;
                if(result.length){

                    // Correct Credentials
                    req.session.user = result[0].id;
                    req.session.loginuser = "trainer";
                    console.log(req.session.user)

                    // res.render(__dirname+"/Trainer.html")
                    res.render(__dirname+"/Trainer.html",{name:result[0].name,data:1})
                        
                }
                else{
                    // fake user
                    req.session.user = -1
                    res.render(__dirname+"/login.html",{fakeuser:"1"})
                }
            })
        }
        else{
            var getUser = "SELECT * FROM members WHERE id ='"+req.session.user+"'";
            con.query(getUser,function(error,result){
                if (error) throw error;
                if(result.length){

                    var getUser = "SELECT * FROM register WHERE id ='"+req.session.user+"'";
                    con.query(getUser,function(error,result){
                        if (error) throw error;
                        if(result.length){

                            // go to member page 
                            req.session.user = req.session.user 
                            res.render(__dirname+"/member.html",{name:result[0].firstname,data:1,type:result[0].personaltraining,userid:req.session.user})
                        }
                        else{
                            // go to home page Login successful 
                            req.session.user = req.session.user 
                            res.render(__dirname+"/home.html",{data:1})
                        }
                    })

                }
                else{
                    // fake user
                    req.session.user = -1
                    res.render(__dirname+"/login.html",{fakeuser:"0"})
                }
            })
        }
    }
    else{
        res.render(__dirname+"/login.html",{fakeuser:"0"});
    }
    
})

// registration page GET
app.get(["/registration.html"],function(req,res){

    console.log(req.session) 
    if(req.session.user)
    {
        var getUser = "SELECT * FROM register WHERE id ='"+req.session.user+"'";
        con.query(getUser,function(error,result){
            if (error) throw error;
            if(result.length){
                req.session.user = req.session.user 
                res.render(__dirname+"/member.html",{name:result[0].firstname,data:1,type:result[0].personaltraining,userid:req.session.user})
            }
            else{
                // 
                req.session.user = -1
                res.sendFile(__dirname+"/register.html")
            }
        })
        
    }
    else{
        res.render(__dirname+"/login.html",{fakeuser:"0"});
    }

})

// registration page POST
app.post(["/registration.html"],function(req,res){

    k = req.body;

    var register = "INSERT INTO `register` (`registerid`,`id`, `firstname`, `lastname`, `address1`, `address2`, `city`, `state`, `currentweight`, `goalweight`, `age`, `height`, `healthcondition`, `personaltraining`) VALUES (NULL, '"+req.session.user+"', '"+k.a1+"', '"+k.a2+"', '"+k.a3+"', '"+k.a4+"', '"+k.a5+"', '"+k.a6+"', '"+k.a7+"', '"+k.a8+"', '"+k.a9+"', '"+k.a10+"', '"+k.a11+"', 'Normal')";
    con.query(register,function(error,result){
        if(error) throw error;
        if(result.affectedRows == 1)
        {
            console.log("OK registerd")
            var getUser = "SELECT * FROM members,register WHERE register.id ='"+req.session.user+"'";
            con.query(getUser,function(error,result){
                if (error) throw error;
                if(result.length){
                    req.session.user = req.session.user 
                    res.render(__dirname+"/member.html",{name:result[0].firstname,data:1,type:result[0].personaltraining,userid:req.session.user})
                }
                else{
                    // fake user
                    req.session.user = -1
                    res.render(__dirname+"/login.html",{fakeuser:"1"})
                }
            })
        }
        else{
            console.log("Failed registration")
            res.send("Failed registered");
        }
    });
    // res.send("registered");
})



// verify page GET
app.get("/verify.html",function(req,res){
    checkcode = req.query.verifycode;
    checkid = req.query.userid;

    console.log(checkcode+" "+checkid)
    
    verifyuser = "UPDATE members SET verified = 1 WHERE id = '"+checkid+"' AND verifycode = '"+checkcode+"'";

    con.query(verifyuser,function(error,result){
        if (error) throw error;
        if(result.affectedRows){
            res.sendFile(__dirname+"/verify.html");
            console.log("verified");
        }
        else{
            console.log(result)
            res.sendFile(__dirname+"/notverify.html");
        }
        
    })

})

// signup page POST
app.post("/signup.html",function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;
    var verifycode = betweenRandomNumber(10000000, 99999999);

    var checkAccount = "SELECT email FROM members WHERE email = '"+email+"'";

    con.query(checkAccount,function(error,result){
        if (error) throw error;

        if(result.length){
            console.log(result);
            console.log(result.length+" User Exists.");

            res.send("Email ID already registered with us. <br> "+
                    "Kindly check your email for verification details ");
        }
        else{

            console.log(result);
            console.log(result.length+" NEW USER");

            // Inserting DATA into Database and sending email for verification
            var sql = "Insert into members (email,password,phone,verifycode) values ('"
            +email+"','"+password+"','"+phone+"','"+verifycode+"') ";

            con.query(sql,function(error,result){
            if (error) throw error;

            var message = "Thank you "+email+" for registering with us <br>"+
            "<a href='127.0.0.1/verify.html?verifycode="+verifycode+"&userid="+result.insertId+"'> Click Here to Verify you Email </a>";

            async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"GYM Management System"', // sender address
                to: email, // list of receivers
                subject: "GYM Verification Code", // Subject line
                text: message, // plain text body
                html: message, // html body
            });

            console.log("Message sent: %s", info.messageId);

            }

            res.send("Gym Member Register Successful ! <br> Email Verification Credentials sent to your Email ");

            main().catch(console.error);
            });

        }
            
    })

    
})

// Join Personal training GET method
app.post("/personaltraining.html",function(req,res){
    k = req.body;

    var updateUser = "UPDATE register SET personaltraining = 'Personal', "+
                     "shoulder = '"+k.b1+"' , "+
                     "chest = '"+k.b2+"' , "+
                     "waist = '"+k.b3+"' , "+
                     "hip   = '"+k.b4+"' , "+
                     "bicep = '"+k.b5+"' , "+
                     "thigh = '"+k.b6+"' "+
                     "WHERE id = '"+req.session.user+"' ";

    con.query(updateUser,function(error,result){
        if (error) throw error;

        if(result.affectedRows){
            var getUser = "SELECT * FROM register WHERE id ='"+req.session.user+"'";
            con.query(getUser,function(error,result){
                if (error) throw error;
                if(result.length){
                    req.session.user = req.session.user 
                    res.render(__dirname+"/member.html",{name:result[0].firstname,data:1,type:result[0].personaltraining,userid:req.session.user})
                }
                else{
                    // 
                    req.session.user = -1
                    res.sendFile(__dirname+"/register.html")
                }
            })
        }else{
            res.sendFile(__dirname+"/home.html")
        }
    })

});


// add Trainer page POST
app.post("/addTrainer.html",function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;

    var checkAccount = "SELECT email FROM trainer WHERE email = '"+email+"'";

    con.query(checkAccount,function(error,result){
        if (error) throw error;

        if(result.length){
            console.log(result);
            console.log(result.length+" User Exists.");

            res.sendFile(__dirname+"/trainerAlreadyAdded.html");
        }
        else{

            console.log(result);
            console.log(result.length+" NEW USER");

            // Inserting DATA into Database to add NEW TRAINER
            var sql = "Insert into trainer (name,email,password,phone) values "+
            "('"+name+"','"+email+"','"+password+"','"+phone+"') ";

            con.query(sql,function(error,result){
            if (error) throw error;

            res.sendFile(__dirname+"/trainerAdded.html");

            });

        }
            
    })

    
})

// view trainer page GET
app.get(["/viewTrainer.html"],function(req,res){
    var checkAccount = "SELECT * FROM trainer";

    con.query(checkAccount,function(error,result){
        if (error) throw error;

        console.log(result);
        console.log(result.length+" Trainers Exists.");

        res.render(__dirname+"/viewTrainer.html",{data:result});
        
    })

    
})

// view member page GET
app.get(["/viewMember.html"],function(req,res){

    var checkAccount = "SELECT members.id , assignedtrainer.memberid , members.email , members.password , members.phone "+
    " , trainer.name as trainername FROM  members "+
    " LEFT JOIN (assignedtrainer,trainer) ON members.id = assignedtrainer.memberid AND trainer.id = assignedtrainer.trainerid "
   

    con.query(checkAccount,function(error,result){
        if (error) throw error;
        console.log(result);
    
        console.log(result.length+" Members Exists. below is user data");
        res.render(__dirname+"/viewMember.html",{data:result}); 
    })

})

// Delete Trainer page POST Request
app.post("/deleteTrainer.html",function(req,res){
    var trainerid = req.body.userid;
    console.log(trainerid)

    var deleteTrainer = "DELETE FROM trainer WHERE id = '"+trainerid+"' " ;

    con.query(deleteTrainer,function(error,result){
        if (error) throw error;

        // AFTER DELETE SHOW NORMAL TRAINER PAGE TO ADMIN
        var checkAccount = "SELECT * FROM trainer";

        con.query(checkAccount,function(error,result){
            if (error) throw error;

            res.render(__dirname+"/viewTrainer.html",{data:result});
            
        })
        
    });
    
})

// Delete Member page POST Request
app.post("/deleteMember.html",function(req,res){
    var membersid = req.body.userid;
    console.log(membersid)

    var deleteTrainer = "DELETE FROM members WHERE id = '"+membersid+"' " ;

    con.query(deleteTrainer,function(error,result){
        if (error) throw error;

        // AFTER DELETE SHOW NORMAL MEMBERS PAGE TO ADMIN
        var checkAccount = "SELECT members.id , assignedtrainer.memberid , members.email , members.password , members.phone "+
        " , trainer.name as trainername FROM  members "+
        " LEFT JOIN (assignedtrainer,trainer) ON members.id = assignedtrainer.memberid AND trainer.id = assignedtrainer.trainerid "
       
    
        con.query(checkAccount,function(error,result){
            if (error) throw error;
            console.log(result);
        
            console.log(result.length+" Members Exists. below is user data");
            res.render(__dirname+"/viewMember.html",{data:result}); 
        })
    })
    
})


// assignTrainer POST page
app.post(["/assignTrainer.html"],function(req,res){
    var checkAccount = "SELECT * FROM trainer";

    console.log(req.body.userid)

    con.query(checkAccount,function(error,result){
        if (error) throw error;

        res.render(__dirname+"/assignTrainer.html",{data:result,memberid:req.body.userid});
        
    })

    
})

// saveaAssignedTrainer POST page
app.post(["/saveAssignedTrainer.html"],function(req,res){
    
    console.log(req.body)

    user1 = req.body.userid;
    user2 = req.body.trainerid;

    var insertEntry = "INSERT INTO assignedtrainer(memberid,trainerid) VALUES('"+user1+"' , '"+user2+"') "

    con.query(insertEntry,function(error,result){
        if (error) throw error;

        // AFTER assigning trainer SHOW NORMAL MEMBERS PAGE TO ADMIN
        var checkAccount = "SELECT members.id , assignedtrainer.memberid , members.email , members.password , members.phone "+
        " , trainer.name as trainername FROM  members "+
        " LEFT JOIN (assignedtrainer,trainer) ON members.id = assignedtrainer.memberid AND trainer.id = assignedtrainer.trainerid "
       
    
        con.query(checkAccount,function(error,result){
            if (error) throw error;
            console.log(result);
        
            console.log(result.length+" Members Exists. below is user data");
            res.render(__dirname+"/viewMember.html",{data:result}); 
        })
        
    })

    
})

// member chat page GET
app.get("/memberChat.html",function(req,res){

    if(req.session.user && req.session.user != -1){

        var checkAssignedTrainer = "SELECT * FROM assignedtrainer,trainer WHERE memberid = '"+req.session.user+"' AND trainerid = trainer.id ";
        req.session.user = req.session.user
        con.query(checkAssignedTrainer,function(error,result){
            if (error) throw error;

            console.log(result)

            if(result.length){
                console.log("OK you can Chat  !! trainer allocated ")

                // show chat if NO NEW message 

                var getChat = "SELECT * FROM chat WHERE memberid = '"+req.session.user+"' ";

                con.query(getChat,function(error,prevChat){
                    if (error) throw error;

                    console.log(prevChat)
                    res.render(__dirname+"/memberChat.html",{trainer:1,data:result,chat:prevChat});
                })

            }else{
                console.log("No Trainer assigned by Admin")
                res.render(__dirname+"/memberChat.html",{trainer:0});
            }
            
        })

    }else{
        req.session.user = -1
        res.render(__dirname+"/login.html",{fakeuser:"0"});
    }

})

// member chat page POST
app.post("/memberChat.html",function(req,res){

    if(req.session.user && req.session.user != -1){

        var checkAssignedTrainer = "SELECT * FROM assignedtrainer,trainer WHERE memberid = '"+req.session.user+"' AND trainerid = trainer.id ";
        req.session.user = req.session.user
        con.query(checkAssignedTrainer,function(error,result){
            if (error) throw error;

            console.log(result)

            if(result.length){
                console.log("OK you can Chat  !! trainer allocated ")
                // console.log(req.body.message)

                // save chat
                if(req.body.message){
                    var memid  = req.session.user 
                    var trainid = result[0].trainerid
                    var sender = "member"
                    var msg = req.body.message
                    // console.log(memid,trainid,sender,msg)

                    var saveMessage = "Insert into chat(memberid,trainerid,sender,message)"+
                    "values('"+memid+"','"+trainid+"','"+sender+"','"+msg+"')";

                    con.query(saveMessage,function(error,msgSaved){
                        if (error) throw error;

                        console.log("message sent")

                        // show chat after saving the chat

                        var getChat = "SELECT * FROM chat WHERE memberid = '"+memid+"' ";

                        con.query(getChat,function(error,prevChat){
                            if (error) throw error;

                            // console.log(prevChat)
                            res.render(__dirname+"/memberChat.html",{trainer:1,data:result,chat:prevChat});
                        })

                    })
                }
                else{
                    // show chat if NO NEW message 

                    var getChat = "SELECT * FROM chat WHERE memberid = '"+memid+"' ";

                    con.query(getChat,function(error,prevChat){
                        if (error) throw error;

                        console.log(prevChat)
                        res.render(__dirname+"/memberChat.html",{trainer:1,data:result,chat:prevChat});
                    })

                }

            }else{
                console.log("No Trainer assigned by Admin")
                res.render(__dirname+"/memberChat.html",{trainer:0});
            }
            
        })

    }else{
        req.session.user = -1
        res.render(__dirname+"/login.html",{fakeuser:"0"});
    }

})



app.listen(80)