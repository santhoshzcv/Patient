var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var patientSchema =new Schema({
        _id: Number,
        name: String,
        dob: String,

        phoneno:Number,
        address:String,
        bloodgroup:String,
    
        hospitalname:String,
        doctorname:String,
        visitdate:String,
        diseasename:String,
         
        paymentbillnumber :Number ,
        paymentmode:String,
        amountpaid:Number 
    })

module.exports = mongoose.model('patient',patientSchema)