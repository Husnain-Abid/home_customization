# Jasontannerftw Backend

A Node.js Express backend with Nodemailer for sending emails and PDFs.

## Features

- ✅ Email sending with Nodemailer (no limitations like EmailJS)
- ✅ PDF file attachment support
- ✅ CORS enabled for frontend integration
- ✅ Environment variable configuration
- ✅ File upload handling with Multer
- ✅ Error handling and validation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your email settings:

```bash
cp env.example .env
```

Edit `.env` file with your email credentials:

```env
# Email Configuration (Gmail Example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 3. Gmail App Password Setup

For Gmail, you need to create an App Password:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Use this password in your `.env` file

### 4. Run the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /api/send-email

Sends an email with PDF attachment.

**Request Body (FormData):**
- `pdf`: PDF file (optional)
- `data`: JSON string containing:
  - `firstName`: string (required)
  - `lastName`: string (required)
  - `email`: string (required)
  - `phone`: string (required)
  - `message`: string (required)
  - `totalPrice`: string (required)
  - `productData`: object (optional)
  - `selectedFeatures`: array (optional)

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "message-id-here"
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Backend is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Frontend Integration

The frontend is configured to use this backend API. Make sure:

1. Backend is running on port 5000
2. Frontend is configured to call `http://localhost:5000/api/send-email`
3. CORS is properly configured for your frontend URL

## Benefits Over EmailJS

- ✅ No email sending limitations
- ✅ No PDF size limitations (configurable up to 10MB)
- ✅ Full control over email templates
- ✅ Better error handling
- ✅ Custom validation
- ✅ No external service dependencies
- ✅ Free to use with your own email provider

## Troubleshooting

### Email Not Sending
1. Check your email credentials in `.env`
2. Verify Gmail App Password is correct
3. Check if 2FA is enabled on your Gmail account
4. Check server logs for detailed error messages

### CORS Issues
1. Verify `FRONTEND_URL` in `.env` matches your frontend URL
2. Check if frontend is running on the correct port

### File Upload Issues
1. Check file size (max 10MB)
2. Verify PDF file format
3. Check server logs for upload errors 