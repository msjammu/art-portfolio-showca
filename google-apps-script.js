/**
 * Google Apps Script to save Diwali Auction bids to Google Sheets
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this code
 * 4. Save the project with a name like "Diwali Auction Tracker"
 * 5. Deploy as a web app (see instructions below)
 * 6. Copy the web app URL and replace YOUR_SCRIPT_ID in App.tsx
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get or create the spreadsheet
    const spreadsheet = getOrCreateSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    
    // Ensure headers are present
    setupHeaders(sheet);
    
    // Add the new bid data
    const rowData = [
      data.timestamp,
      data.fullName,
      data.email,
      data.phone,
      data.bidAmount,
      data.previousBid,
      data.item,
      data.charity,
      'Active' // Status column
    ];
    
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, sheet.getLastColumn());
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Bid saved successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error and return error response
    console.error('Error saving bid:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSpreadsheet() {
  const SPREADSHEET_NAME = 'Diwali Auction Bids - Art Studio by Akash';
  
  // Try to find existing spreadsheet
  const files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  
  if (files.hasNext()) {
    const file = files.next();
    return SpreadsheetApp.openById(file.getId());
  } else {
    // Create new spreadsheet
    const spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
    
    // Share with yourself (optional - replace with your email)
    // spreadsheet.addEditor('your-email@gmail.com');
    
    return spreadsheet;
  }
}

function setupHeaders(sheet) {
  // Check if headers already exist
  if (sheet.getLastRow() === 0) {
    const headers = [
      'Timestamp',
      'Full Name',
      'Email',
      'Phone',
      'Bid Amount',
      'Previous Bid',
      'Item',
      'Charity',
      'Status'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
  }
}

// Test function to verify the script works
function testFunction() {
  const testData = {
    timestamp: new Date().toLocaleString(),
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '555-123-4567',
    bidAmount: 250,
    previousBid: 200,
    item: 'Ganeshji Resin Art - Diwali Special',
    charity: 'UTSAV USA'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}

/**
 * DEPLOYMENT INSTRUCTIONS:
 * 
 * 1. Save this script in Google Apps Script
 * 2. Click "Deploy" > "New deployment"
 * 3. Choose type: "Web app"
 * 4. Set Execute as: "Me"
 * 5. Set Who has access: "Anyone" (required for external calls)
 * 6. Click "Deploy"
 * 7. Copy the Web app URL
 * 8. Replace YOUR_SCRIPT_ID in the App.tsx file with your actual script URL
 * 
 * SECURITY NOTE:
 * - The script will create a spreadsheet that only you can access
 * - The web app accepts data from anyone, but only saves to your private sheet
 * - Consider adding additional validation if needed
 */