const nodemailer = require('nodemailer'); 


let mailTransporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user: 'roy.json756@gmail.com', 
		pass: 'User@weak123'
	} 
}); 

let defaultMail = { 
	from: 'roy.json756@gmail.com'
}; 
module.exports = function(mail){
    // use default setting
    console.log(mail)
    //mail = _.merge({}, defaultMail, mail);
    
   // console.log(mail);
    mailTransporter.sendMail(mail, function(error, info){
        if(error) return console.log(error);
        console.log('mail sent:', info.response);
    });
};