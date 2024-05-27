import emailjs from 'emailjs-com';

export const sendEmail = (to, message, subject) => {
  const serviceID = 'service_iduc9o9'; // Replace with your actual service ID
  const templateID = 'template_u93lqxe'; // Replace with your actual template ID
  const publicKey = 'MBWQ19wD3wWpp2hxv'; // Replace with your actual public key

  const templateParams = {
    to_email: to,
    message: message,
    subject: subject,
  };

  return emailjs.send(serviceID, templateID, templateParams, publicKey)
    .then(response => {
      console.log('SUCCESS!', response.status, response.text);
    })
    .catch(error => {
      console.error('FAILED...', error);
    });
};
