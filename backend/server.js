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
            'http://localhost:3000',
            'http://localhost:3001',
            'https://freepoint-homes.vercel.app'
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
                .total { font-size: 18px; font-weight: bold; color: #C2A45C; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Freepoint Homes</h1>
                    <h2>Your Customized Home Configuration</h2>
                </div>
                
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
                        <span class="label">Total Price:</span>
                        <span class="value total">$${data.totalPrice}</span>
                    </div>
                    
                    <p>Thank you for choosing Freepoint Homes! We will review your customized home configuration and get back to you soon.</p>
                </div>
                
                <div class="footer">
                    <p>Contact us: contact@freepointhomes.com</p>
                    <p>www.freepointhomes.com</p>
                </div>
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
app.post('/api/send-email', upload.single('pdf'), async (req, res) => {
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
        const mailOptions = {
            from: `"Freepoint Homes" <${process.env.EMAIL_FROM}>`,
            to: email,
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
app.post('/api/send-email-base64', async (req, res) => {
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
            from: `"Freepoint Homes" <${process.env.EMAIL_FROM}>`,
            to: email,
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
app.get('/api/health', (req, res) => {
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
