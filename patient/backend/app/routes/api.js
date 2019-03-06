var User = require('../models/user');
var request = require("request");
const uuidv1 = require('uuid/v1');
var PatientData = require('../models/patientdata');

module.exports = function (router) {
    router.post('/users', function (req, res) {
        var user = new User()
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if (req.body.username == null || req.body.username == '' || req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == '') {
            res.send("ensure username , email and password were provided");
        } else {
            user.save(function (err) {
                if (err) {
                    res.status(200).json({ message: "username or email already exits" })
                } else {
                    res.status(200).json({ message: "user created" });
                }
            });
        }
    })

    router.post('/login', function (req, res) {
        User.findOne({ email: req.body.email }).select('email username  password').exec(function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'could not authenticate user' })
            } else if (user) {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({ success: false, message: 'could not authenticate password' })
                } else {
                    res.json({ success: true, message: 'user authenticated!' })
                }
            }
        })
    })

    router.post('/patientdata', function (req, res) {
        
        var patientschema = req.body;
        var patientdata = new PatientData(patientschema);
        console.log(patientdata);
      
        patientdata.save(function (err) {
            if (err) {
                res.status(200).json({ message: "not saved" })
            } else {
                 
               var abc =patient();
                abc.then(function(){
                    patientRecord();
                    res.status(200).json({ message: "saved sucessfully" }); 
                });
                     
            }
        })

function patient(){
         let postData = {
            "$class": "test.Patient",
            "patientId": patientdata._id,
            "name": patientdata.name,
            "dob": patientdata.dob,
            "phoneno": patientdata.phoneno,
            "address": patientdata.address,
            "bloodgroup":patientdata.bloodgroup
         }

        const options = {
            url: "http://localhost:3000/api/Patient",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }
        return new Promise(function(resolve, reject) {
        request(options, (error, result, body) => {
            if (error) {
                return reject(error);  
            }
            else if (result.statusCode != 200 && result.statusCode != 201) {
                console.log(result.statusMessage);
                return reject(error);
            }else{
                console.log(body);
                resolve(JSON.parse(body));        
            }
        });
    })
    
}

function  patientRecord(){
         let postData1 = {
            
                "$class": "test.PatientRecord",
                "recordId": uuidv1(),
                "owner": "test.Patient#"+patientdata._id,
                "hospitalname": patientdata.hospitalname,
                "doctorname": patientdata.doctorname,
                "visitdate": patientdata.visitdate,
                "diseasename": patientdata.diseasename,
                "paymentbillnumber":patientdata.paymentbillnumber,
                "paymentmode": patientdata.paymentmode,
                "amountpaid": patientdata.amountpaid
              
         }

        const options = {
            url: "http://localhost:3000/api/PatientRecord",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData1)
        }
        return new Promise(function(resolve, reject) {
        request(options, (error, result, body) => {
            if (error) {
                return reject(error);  
            }
            else if (result.statusCode != 200 && result.statusCode != 201) {
                return reject(result.statusMessage);
                // console.log(result.statusMessage)
            }else{
                console.log(body);
                resolve(JSON.parse(body));
                //  res.status(200).json({ message: "saved sucessfully" });    
                
            }
        });
    })

    }

    })
    
    router.get('/getpatientdata', function (req, res) {
        PatientData.find(function (err, patientdata) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({ "patientdata": patientdata })
            }
        })
    })
    router.get('/singlepatient/:id', function (req, res) {
        console.log(req.params.id);
        PatientData.findOne({ _id: req.params.id }, function (err, patientdata) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({ "patientdata": patientdata })


            }
        })
   })
    return router;
}