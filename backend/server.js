const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const allowedOrigins = [
            'http://160.153.186.37',          // ✅ server IP
            'http://freepointhomes.com',      // future
            'https://freepointhomes.com'      // future SSL
            // 'http://localhost:3000',

        ];


        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1000000);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf');
    }
});

const upload = multer({
    storage: storage,
});

// Create Nodemailer transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

// Email template function
const createEmailTemplate = (data) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Your Customized Home Configuration</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #C2A45C; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background-color: #f9f9f9; }
                .footer { background-color: #C2A45C; color: white; padding: 15px; text-align: center; }
                .info-row { margin: 10px 0; }
                .label { font-weight: bold; color: #666; }
                .value { color: #333; }
                .total { font-size: 18px; font-weight: bold; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">

     <!-- EMAIL HEADER -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#000000; padding:16px 0px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#000000;">
        <tr>

          <!-- LEFT: Company Name / Logo -->

<td align="left" style="padding:16px 24px;">
  <img 
    src="https://res.cloudinary.com/dlg1yfbtu/image/upload/v1770099303/logo_dnpfju.png"
    alt="Freepoint Homes"
    width="180"
    style="
      display:block;
      max-width:180px;
      height:auto;
    "
  />
</td>







          <!-- RIGHT: Contact Info -->
          <td align="right" style="
            padding:16px 24px;
            font-family:Arial, sans-serif;
            font-size:13px;
            color:#fff;
            line-height:1.6;
          ">
            <div style="color:#fff;">📞 (206)-855-3192</div>
            <div>
              ✉️ <a href="mailto:contact@freepointhomes.com"
                   style="color:#fff; text-decoration:none;">
                contact@freepointhomes.com
              </a>
            </div>
          </td>

        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- END HEADER -->


<!-- DIVIDER -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0">
        <tr>
          <td style="
            height:1px;
            background:#d1d5db;
          ">
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- END DIVIDER -->



                
                <div class="content">
                    <h3>Customer Information</h3>
                    <div class="info-row">
                        <span class="label">Name:</span>
                        <span class="value">${data.firstName} ${data.lastName}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Email:</span>
                        <span class="value">${data.email}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Phone:</span>
                        <span class="value">${data.phone}</span>
                    </div>
                    
                    <h3>Message</h3>
                    <p>${data.message}</p>
                    
        

<h3>Configuration Summary</h3>

<div class="info-row">
  <span class="label">Total Estimated Price:</span>
  <span class="value total">$${data.totalPrice}</span>
</div>

<p>
  <strong>Thank you for choosing Freepoint Homes!</strong>
  We appreciate you taking the time to create your custom home and build your estimate.
  We are committed to your satisfaction from beginning to end and are looking forward to
  how we may best serve you. We’ll be in touch within 24–48 hours.
</p>

<p>
  If there are additional questions, please contact us anytime.
</p>



                </div>
                
       
<!-- DIVIDER -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;" >
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0">
        <tr>
          <td style="
            height:1px;
            background:#d1d5db;
          ">
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- END DIVIDER -->



<!-- EMAIL FOOTER -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#000; padding:16px 0px;" >
  <tr>
    <td align="center" style="
      padding:24px 16px;
      font-family:Arial, sans-serif;
      font-size:13px;
      color:#fff;
      line-height:1.6;
      text-align:center;
    ">
      <strong>Freepoint Homes, LLC</strong><br>
      Call or Text: 206-855-3192<br>
      Email:
      <a href="mailto:contact@freepointhomes.com"
         style="color:#fff; text-decoration:none;">
        contact@freepointhomes.com
      </a>
    </td>
  </tr>
</table>
<!-- END FOOTER -->



            </div>
        </body>
        </html>
    `;
};






// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Freepoint Homes Backend API is running!' });
});

// Send email with PDF attachment
app.post('/send-email', upload.single('pdf'), async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message, totalPrice } = req.body;

        if (!firstName || !lastName || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Create transporter
        const transporter = createTransporter();

        // Email options
        // const mailOptions = {
        //     from: `"Freepoint Homes" <${process.env.EMAIL_FROM}>`,
        //     to: email,
        //     subject: 'Your Customized Home Configuration - Freepoint Homes',
        //     html: createEmailTemplate({
        //         firstName,
        //         lastName,
        //         email,
        //         phone,
        //         message,
        //         totalPrice
        //     }),
        //     attachments: req.file ? [
        //         {
        //             filename: req.file.originalname || 'customized-home-configuration.pdf',
        //             path: req.file.path,
        //             contentType: 'application/pdf'
        //         }
        //     ] : []
        // };

        const mailOptions = {
            from: `"Freepoint Homes" <contact@freepointhomes.com>`, // FIXED FROM
            to: email, // customer email
            cc: 'contact@freepointhomes.com', // ✅ ALWAYS CC
            subject: 'Your Customized Home Configuration - Freepoint Homes',
            html: createEmailTemplate({
                firstName,
                lastName,
                email,
                phone,
                message,
                totalPrice
            }),
            attachments: req.file ? [
                {
                    filename: req.file.originalname || 'customized-home-configuration.pdf',
                    path: req.file.path,
                    contentType: 'application/pdf'
                }
            ] : []
        };



        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent successfully:', info.messageId);

        res.json({
            success: true,
            message: 'Email sent successfully!',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error: error.message
        });
    }
});

// Send email with base64 PDF 
app.post('/send-email-base64', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message, totalPrice, pdfBase64 } = req.body;

        if (!firstName || !lastName || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Create transporter
        const transporter = createTransporter();

        // Email options
        const mailOptions = {
            from: `"Freepoint Homes" <contact@freepointhomes.com>`, // FIXED FROM
            to: email, // customer email
            cc: 'contact@freepointhomes.com', // ✅ ALWAYS CC
            subject: 'Your Customized Home Configuration - Freepoint Homes',
            html: createEmailTemplate({
                firstName,
                lastName,
                email,
                phone,
                message,
                totalPrice
            }),
            attachments: pdfBase64 ? [
                {
                    filename: 'customized-home-configuration.pdf',
                    content: pdfBase64,
                    encoding: 'base64',
                    contentType: 'application/pdf'
                }
            ] : []
        };

        // Send email
        const info = transporter.sendMail(mailOptions);


        console.log('Email sent successfully:', info.messageId);

        res.json({
            success: true,
            message: 'Email sent successfully!',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
