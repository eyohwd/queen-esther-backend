const express = require('express');
const router = express.Router()


router.get('/paystack', (req, res)=>{
    const https = require('https')
    
    const params = JSON.stringify({
        "email": req.query.email,
        "amount": req.query.amount,
        
      })

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'content-Type': 'appliction/json'
      }
    }
    
    const reqpaystack= https.request(options, respaystack => {
      let data = ''
    
      respaystack.on('data', (chunk) => {
        data += chunk
      });
    
      respaystack.on('end', () => {
        res.send(data)
        console.log(JSON.parse(data))
      })
    }).on('error', error => {
      console.error(error)
    })

    reqpaystack.write(params)
    reqpaystack.end()
});


module.exports = router;