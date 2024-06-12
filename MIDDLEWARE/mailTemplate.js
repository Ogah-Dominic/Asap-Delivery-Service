// emailTemplates.js

// This function generates the email template with a dynamic link
function mailTemplate(link, fullname) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification - CHOWFINDER</title>
      <style>
        body {
          background: linear-gradient(90deg, #00ccff, #ffffff);
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
    
        .container {
          max-width: 350px;
          padding: 40px;
          background-color: white;
          border-radius: 8px;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        }
    
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
    
        .logo {
          max-width: 220px;
          height: auto;
        }
    
        .slogan {
          font-size: 18px;
          text-align: center;
          margin-top: 0;
          color: #FC8019;
        }
    
        .verification-message {
          font-size: 16px;
          color: #333;
          margin-bottom: 20px;
          text-align: justify;
        }
    
        .verification-button {
          display: block;
          width: 100%;
          max-width: 200px;
          background-color: #FC8019;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 12px;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin: 0 auto;
          text-decoration: none; 
        }
    
        .verification-button:hover {
          background-color: #FFA75F;
        }
    
        .footer {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://res.cloudinary.com/dpugols4b/image/upload/v1692122110/53FCB659-7D06-4CFD-BEDD-71C8A5FE2AC4-removebg-preview_ptap4b.png" alt="CHOWFINDER Logo" class="logo">
          <!-- <p class="slogan">You Crave, We Deliver</p> -->
        </div>
        <div class="verification-message">Dear ${fullname},</div>
        <div class="verification-message">Thank you for signing up with CHOWFINDER. To complete your registration, please click the button below to verify your email address:</div>
        <a href=${link} class="verification-button">Verify Email</a>
      </div>
      <div class="footer">
        CHOWFINDER | Address: 161 Muyibi Street, Olodi-Apapa, Ajegunle | Phone: (234) 456-7890 | Email: chowfinder1@gmail.com
      </div>
    </body>
    </html>
    
  
  
  
    `;
  }
  
  
  
  function forgotMailTemplate(link, fullname) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - CHOWFINDER</title>
    <style>
      body {
        background: linear-gradient(90deg, orange, white);
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
  
      .container {
        max-width: 400px;
        padding: 40px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      }
  
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
  
      .header h1 {
        font-size: 36px;
        color: orange;
        margin: 0;
      }
  
      .slogan {
        font-size: 18px;
        text-align: center;
        margin-top: 0;
      }
  
      .reset-button {
        display: block;
        width: 100%;
        max-width: 200px; /* Reduced button width */
        background-color: orange;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px; /* Reduced button padding */
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin: 0 auto; /* Center the button */
      }
  
      .reset-button:hover {
        background-color: #444;
      }
  
      .key-symbol {
        display: block;
        text-align: center;
        font-size: 48px;
        margin-bottom: 20px;
        color: orange;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="key-symbol">
        &#128272; <!-- Unicode for the key symbol -->
      </div>
      <div class="header">
        <h1>CHOWFINDER</h1>
        <p class="slogan">You Crave, We Deliver</p>
      </div>
      <p>Hello ${fullname},</p>
      <p>It seems you have requested to reset your password. Click the button below to proceed:</p>
      <a class="reset-button" href=${link}>Reset Password</a>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>Best regards,<br>CHOWFINDER Team</p>
    </div>
  </body>
  </html>
  
  
  
    `;
  }
  
  
  function orderMailTemplate(fullname, orderId, orderDate, items, total) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Reset some default styles for consistency */
        body, p {
          margin: 0;
          padding: 0;
        }
    
        /* Container styles */
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #e0e0e0;
          font-family: Arial, sans-serif;
        }
    
        /* Header styles */
        .header {
          text-align: center;
          padding: 10px 0;
        }
    
        /* Logo styles */
        .logo {
          max-width: 220px;
          height: auto;
        }
    
        /* Content styles */
        .content {
          margin-top: 20px;
          padding: 20px;
          background-color: #f7f7f7;
        }
    
        /* Order details styles */
        .order-details {
          margin-bottom: 20px;
        }
    
        /* Footer styles */
        .footer {
          text-align: center;
          padding: 10px 0;
          background-color: #e0e0e0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="https://res.cloudinary.com/dpugols4b/image/upload/v1692122110/53FCB659-7D06-4CFD-BEDD-71C8A5FE2AC4-removebg-preview_ptap4b.png" alt="Food Logo" class="logo">
          <h1>Order Confirmation</h1>
        </div>
        <div class="content">
          <p>Dear ${fullname},</p>
          <p>Your order has been successfully placed!</p>
          <div class="order-details">
            <h2>Order Details:</h2>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Date:</strong> ${orderDate}</p>
            <p><strong>Items:</strong></p>
            <ul>
              ${items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p><strong>Total Amount:</strong> &#8358; ${total}</p>
          </div>
          <p>Thank you for choosing us for your meal!</p>
        </div>
        <div class="footer">
          <p>If you have any questions, please contact us at chowfinder1@gmail.com.</p>
        </div>
      </div>
    </body>
    </html>
    
    `;
  }
  
  
  function restaurantOrderMailTemplate(fullname, email, address, orderId, orderDate, items, total) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Reset some default styles for consistency */
        body, p {
          margin: 0;
          padding: 0;
        }
    
        /* Container styles */
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #e0e0e0;
          font-family: Arial, sans-serif;
        }
    
        /* Header styles */
        .header {
          text-align: center;
          padding: 10px 0;
        }
    
        /* Logo styles */
        .logo {
          max-width: 220px;
          height: auto;
        }
    
        /* Content styles */
        .content {
          margin-top: 20px;
          padding: 20px;
          background-color: #f7f7f7;
        }
    
        /* Order details styles */
        .order-details {
          margin-bottom: 20px;
        }
    
        /* Footer styles */
        .footer {
          text-align: center;
          padding: 10px 0;
          background-color: #e0e0e0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="https://res.cloudinary.com/dpugols4b/image/upload/v1692122110/53FCB659-7D06-4CFD-BEDD-71C8A5FE2AC4-removebg-preview_ptap4b.png" alt="Food Logo" class="logo">
          <h1>New Order Received</h1>
        </div>
        <div class="content">
          <p>Dear Restaurant Team,</p>
          <p>A new order has been placed by ${fullname} (${email}).</p>
          <div class="order-details">
            <h2>Order Details:</h2>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Date:</strong> ${orderDate}</p>
            <p><strong>Items:</strong></p>
            <ul>
              ${items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p><strong>Total Amount:</strong> &#8358; ${total}</p>
            <p><strong>Delivery Address:</strong> ${address}</p>
          </div>
          <p>Please prepare the order and contact the customer for delivery or pickup details.</p>
        </div>
        <div class="footer">
          <p>If you have any questions, please contact the customer at their provided email address.</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }
  
  
  
  
  
  
  
  module.exports = {
    mailTemplate,
    forgotMailTemplate,
    orderMailTemplate,
    restaurantOrderMailTemplate
  };