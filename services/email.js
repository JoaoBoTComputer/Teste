const nodemailer = require('nodemailer');

const STMP_CONFIG = require('../config/email');

const transporter = nodemailer.createTransport({
  host: STMP_CONFIG.host,
  port: STMP_CONFIG.host,
  secure: false, // true for 465, false for other ports
  auth: {
    user: STMP_CONFIG.user, // generated ethereal user
    pass: STMP_CONFIG.pass, // generated ethereal password
  },
  tls:{
    rejectUnathorizad :false
  }
});

exports.sendEmail= (to,body)=>{
  const mailSent = transporter.sendMail({
    text:'Texto de E-mail',
    subject:'Confirme sua senha',
    from:'Fun midia <victor.joaoVsJ@gmail.com>',
    to:to,
    html:body
  })
}

