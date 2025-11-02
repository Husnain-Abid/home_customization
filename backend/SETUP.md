# Quick Setup Guide

## 1. Start Backend Server

```bash
cd backend-jasontannerft
npm run dev
```

The server will start on `http://localhost:5000`

## 2. Test Backend Health

Visit: `http://localhost:5000/api/health`

You should see:
```json
{
  "success": true,
  "message": "Backend is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 3. Configure Email (Optional for Testing)

Create `.env` file:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 4. Test Email Functionality

1. Start your frontend: `npm run dev` (in jasontannerftw folder)
2. Fill out the form with your data
3. Submit the form
4. Check backend console for logs
5. Check your email for the PDF

## 5. Debug Issues

If you get "Missing required fields" error:

1. Check browser console for the data being sent
2. Check backend console for received data
3. The backend will show exactly which fields are missing

## 6. Test Without Email (Development)

If you don't want to set up email yet, you can test the data parsing by:

1. Comment out the email sending code in `server.js`
2. Just return success response
3. Check if data is being received correctly

## Common Issues:

1. **CORS Error**: Make sure frontend is running on `http://localhost:3000`
2. **PDF Generation Error**: Check if all required data is available in ProductContext
3. **Email Not Sending**: Check Gmail app password and 2FA settings 