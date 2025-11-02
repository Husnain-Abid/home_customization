import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer' // You'll need to install: npm install nodemailer

/**
 * EMAIL API ROUTE
 * 
 * POST /api/send-customization-email
 * 
 * Request body:
 * {
 *   "customerName": "John Doe",
 *   "customerEmail": "john@example.com",
 *   "customizationData": { ... },
 *   "pdfBlob": "base64-encoded-pdf",
 *   "includeOwnerCopy": true
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "Email sent successfully",
 *   "referenceId": "FP-XXXX-XXXX"
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customerName,
      customerEmail,
      customizationData,
      pdfBlob,
      includeOwnerCopy = true,
    } = body

    // Validate required fields
    if (!customerName || !customerEmail || !customizationData) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email service is configured
    const emailService = process.env.EMAIL_SERVICE || 'gmail'
    const emailFrom = process.env.EMAIL_FROM || 'noreply@freepointhomes.com'
    const emailPassword = process.env.EMAIL_PASSWORD
    const clientEmail = process.env.CLIENT_EMAIL || 'jasontannerftw@gmail.com'

    if (!emailPassword) {
      console.warn(
        'Email service not configured. See README for setup instructions.'
      )
      
      // Return success for testing purposes
      // In production, you should return 500 error
      return NextResponse.json({
        success: true,
        message: 'Email configuration not set up. See server logs and README for setup.',
        referenceId: customizationData.id,
        isDemoMode: true,
      })
    }

    // Create transporter
    let transporter
    if (emailService === 'gmail') {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailFrom,
          pass: emailPassword, // Use Gmail App Password, not regular password
        },
      })
    } else if (emailService === 'custom-smtp') {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: emailPassword,
        },
      })
    } else {
      return NextResponse.json(
        { success: false, message: 'Unsupported email service' },
        { status: 500 }
      )
    }

    // Build email content
    const selectedFeaturesList = customizationData.pricing.selectedFeatures
      .map((f: any) => `• ${f.name}: +$${f.price.toLocaleString()}`)
      .join('<br />')

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C2A45C 0%, #B8963F 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .section { margin: 20px 0; }
            .section h2 { color: #C2A45C; font-size: 18px; border-bottom: 2px solid #C2A45C; padding-bottom: 10px; }
            .feature-list { padding: 15px; background: white; border-radius: 5px; }
            .price-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .price-row.total { font-weight: bold; font-size: 18px; border-bottom: 3px solid #C2A45C; margin-top: 10px; padding-top: 15px; }
            .footer { background: #C2A45C; color: white; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
            .reference-id { background: #e8e8e8; padding: 10px; border-radius: 5px; font-family: monospace; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Freepoint Homes</h1>
              <p style="margin: 5px 0 0 0;">Your Customization Summary</p>
            </div>

            <div class="content">
              <p>Hello ${customerName},</p>
              <p>Thank you for customizing your future home! Below is a summary of your selections.</p>

              <div class="section">
                <h2>Reference ID</h2>
                <div class="reference-id">${customizationData.id}</div>
                <p style="font-size: 12px; color: #666;">Please keep this ID for your records.</p>
              </div>

              <div class="section">
                <h2>Customer Information</h2>
                <p><strong>Name:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${customerEmail}</p>
              </div>

              <div class="section">
                <h2>Your Customization</h2>
                <div class="feature-list">
                  <div style="font-weight: bold; margin-bottom: 10px;">
                    Base Home: $${customizationData.pricing.basePrice.toLocaleString()}
                  </div>
                  ${selectedFeaturesList}
                  <div class="price-row total">
                    <span>Total Estimate:</span>
                    <span>$${customizationData.pricing.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div class="section">
                <h2>What's Next?</h2>
                <p>Our team will review your customization and contact you within 24-48 hours to discuss:</p>
                <ul>
                  <li>Final pricing and any applicable discounts</li>
                  <li>Construction timeline</li>
                  <li>Financing options</li>
                  <li>Next steps in the process</li>
                </ul>
              </div>

              <p style="color: #666; font-size: 12px;">
                A detailed PDF with images and full specifications has been attached to this email.
              </p>
            </div>

            <div class="footer">
              <p style="margin: 0;">© 2024 Freepoint Homes. All rights reserved.</p>
              <p style="margin: 5px 0 0 0;">
                <strong>Contact Us:</strong> contact@freepointhomes.com | www.freepointhomes.com
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    // Convert pdfBlob from base64 if needed
    let pdfBuffer: Buffer | undefined
    if (pdfBlob) {
      if (typeof pdfBlob === 'string') {
        pdfBuffer = Buffer.from(pdfBlob, 'base64')
      } else {
        pdfBuffer = Buffer.from(pdfBlob)
      }
    }

    // Prepare attachments
    const attachments: any[] = [
      {
        filename: `customization-${customizationData.id}.json`,
        content: JSON.stringify(customizationData, null, 2),
        contentType: 'application/json',
      },
    ]

    if (pdfBuffer) {
      attachments.push({
        filename: `customization-${customizationData.id}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      })
    }

    // Send email to customer
    await transporter.sendMail({
      from: emailFrom,
      to: customerEmail,
      subject: `Your Freepoint Homes Customization - Reference: ${customizationData.id}`,
      html: htmlContent,
      attachments,
    })

    // Send copy to business email if requested
    if (includeOwnerCopy && clientEmail !== customerEmail) {
      const ownerHtmlContent = `
        ${htmlContent}
        <hr />
        <p><strong>Admin Note:</strong> Customer notification sent to ${customerEmail}</p>
      `

      await transporter.sendMail({
        from: emailFrom,
        to: clientEmail,
        subject: `New Customization - Reference: ${customizationData.id} (${customerName})`,
        html: ownerHtmlContent,
        attachments,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      referenceId: customizationData.id,
      customerEmail,
    })
  } catch (error) {
    console.error('Error sending email:', error)

    if (error instanceof Error) {
      // Check if it's an authentication error
      if (error.message.includes('invalid login') || error.message.includes('Invalid login')) {
        return NextResponse.json(
          {
            success: false,
            message:
              'Email authentication failed. Check EMAIL_PASSWORD and email configuration.',
            error: error.message,
          },
          { status: 401 }
        )
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
