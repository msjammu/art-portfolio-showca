# Google Sheets Integration Setup Guide

## 🪔 Diwali Auction Bid Tracking with Google Sheets

This guide will help you set up automatic saving of auction bids to a Google Sheet.

## 📋 What You'll Get

- **Automatic Bid Tracking**: Every bid is automatically saved to a Google Sheet
- **Complete Information**: Timestamp, contact details, bid amounts, and more
- **Real-time Updates**: New bids appear instantly in your sheet
- **Private & Secure**: Only you can access the spreadsheet

## 🚀 Setup Steps

### Step 1: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Delete the default code
4. Copy and paste the code from `google-apps-script.js` file
5. Save the project (Ctrl+S) and name it "Diwali Auction Tracker"

### Step 2: Deploy as Web App

1. In Google Apps Script, click "Deploy" → "New deployment"
2. Click the gear icon ⚙️ next to "Select type"
3. Choose "Web app"
4. Fill in the deployment settings:
   - **Description**: "Diwali Auction Bid Tracker"
   - **Execute as**: "Me (your-email@gmail.com)"
   - **Who has access**: "Anyone"
5. Click "Deploy"
6. **Copy the Web app URL** (it will look like: `https://script.google.com/macros/s/ABC123.../exec`)

### Step 3: Update Your Website

1. Open `src/App.tsx` in your project
2. Find this line (around line 75):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
   ```
3. Replace `YOUR_SCRIPT_ID` with your actual Web app URL from Step 2

### Step 4: Test the Integration

1. Save your changes and refresh your website
2. Go to the bidding page
3. Place a test bid with fake information
4. Check your Google Drive - you should see a new spreadsheet called "Diwali Auction Bids - Art Studio by Akash"

## 📊 Google Sheet Columns

Your spreadsheet will automatically track:

| Column | Description |
|--------|-------------|
| Timestamp | When the bid was placed |
| Full Name | Bidder's full name |
| Email | Bidder's email address |
| Phone | Bidder's phone number |
| Bid Amount | The bid amount in USD |
| Previous Bid | What the previous highest bid was |
| Item | "Ganeshji Resin Art - Diwali Special" |
| Charity | "UTSAV USA" |
| Status | "Active" (you can manually change this) |

## 🔧 Troubleshooting

### If bids aren't saving:
1. Check that you copied the correct Web app URL
2. Make sure the Google Apps Script is deployed as "Anyone" can access
3. Check the browser console (F12) for error messages

### If you get permission errors:
1. Make sure you're logged into the same Google account
2. Re-deploy the script if needed
3. Check that the script has permission to create files

### To view saved bids:
1. Go to [Google Drive](https://drive.google.com/)
2. Look for "Diwali Auction Bids - Art Studio by Akash" spreadsheet
3. All bids will be listed with timestamps

## 🔐 Security & Privacy

- **Your Data**: Only you can access the spreadsheet with bid information
- **Bidder Privacy**: Bidder information is stored securely in your private Google Drive
- **No Third Parties**: Data goes directly from your website to your Google account

## 📱 Managing Bids

Once bids are in your Google Sheet, you can:
- **Sort by bid amount** to see highest bidders
- **Filter by date** to see recent activity
- **Export data** for record keeping
- **Add notes** in additional columns
- **Contact winners** using the saved contact information

## 🎆 Ready to Launch!

Once you complete these steps, your Diwali charity auction will automatically track all bids in a professional, organized way. Perfect for managing the auction and contacting winners!

---

**Need Help?** If you run into any issues, check the Google Apps Script logs or browser console for error messages.