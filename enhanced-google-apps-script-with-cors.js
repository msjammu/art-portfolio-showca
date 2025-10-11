// Enhanced Google Apps Script with CORS Support
// This version includes proper CORS headers to fix browser fetch issues
// Deploy this version to resolve CORS policy errors

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'read') {
      return readBidData();
    }
    
    // Default response for unsupported GET requests
    const response = {
      success: false,
      message: 'GET method requires action=read parameter'
    };
    
    return createCORSResponse(response);
      
  } catch (error) {
    const response = {
      success: false,
      error: error.toString()
    };
    
    return createCORSResponse(response);
  }
}

function doPost(e) {
  try {
    // Parse the incoming bid data
    const data = JSON.parse(e.postData.contents);
    
    const sheet = SpreadsheetApp.openById('1GIde3V2SsXTLolnZhoblAJtvLUgrU8Vm-OxSoIPQwh8').getActiveSheet();
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Timestamp', 'Full Name', 'Email', 'Phone', 'Bid Amount', 'Item', 'Charity', 'Notes'
      ]]);
    }
    
    // Add the new bid data
    sheet.appendRow([
      new Date(),
      data.fullName,
      data.email,
      data.phone,
      data.bidAmount,
      data.item || 'Ganeshji Resin Art - Diwali Special',
      data.charity || 'UTSAV USA',
      data.notes || 'Online bid submission'
    ]);
    
    const response = {
      success: true,
      message: 'Bid submitted successfully',
      bidAmount: data.bidAmount,
      timestamp: new Date().toISOString()
    };
    
    return createCORSResponse(response);
    
  } catch (error) {
    const response = {
      success: false,
      error: error.toString()
    };
    
    return createCORSResponse(response);
  }
}

function readBidData() {
  try {
    const sheet = SpreadsheetApp.openById('1GIde3V2SsXTLolnZhoblAJtvLUgrU8Vm-OxSoIPQwh8').getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      // No data or only headers
      const response = {
        success: true,
        data: [],
        summary: {
          totalBids: 0,
          highestBid: 200,
          lastUpdated: new Date().toISOString()
        }
      };
      
      return createCORSResponse(response);
    }
    
    // Get all data except header row
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 8);
    const data = dataRange.getValues();
    
    // Calculate summary statistics

    let highestBid = 200; // Starting bid (artist's set price)
    let totalBids = data.length;
    let latestBidTime = null;
    
    data.forEach(row => {
      const bidAmount = parseFloat(row[4]); // Bid Amount is in column E (index 4)
      if (!isNaN(bidAmount) && bidAmount > highestBid) {
        highestBid = bidAmount;
      }
      
      // Track latest bid time
      if (row[0] && (!latestBidTime || row[0] > latestBidTime)) {
        latestBidTime = row[0];
      }
    });
    
    // Return the data and summary
    const response = {
      success: true,
      data: data.map(row => ({
        timestamp: row[0],
        fullName: row[1],
        email: row[2],
        phone: row[3],
        bidAmount: row[4],
        item: row[5],
        charity: row[6],
        notes: row[7]
      })),
      summary: {
        totalBids: totalBids,
        highestBid: highestBid,
        lastUpdated: new Date().toISOString(),
        latestBidTime: latestBidTime ? latestBidTime.toISOString() : null
      }
    };
    
    return createCORSResponse(response);
    
  } catch (error) {
    const response = {
      success: false,
      error: error.toString()
    };
    
    return createCORSResponse(response);
  }
}

// Helper function to create responses with proper CORS headers
function createCORSResponse(data) {
  try {
    const output = ContentService.createTextOutput(JSON.stringify(data));
    output.setMimeType(ContentService.MimeType.JSON);
    
    // Add CORS headers with error handling
    if (output.setHeader) {
      output.setHeader('Access-Control-Allow-Origin', '*');
      output.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      output.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      output.setHeader('Access-Control-Max-Age', '3600');
    }
    
    return output;
  } catch (error) {
    // Fallback if setHeader doesn't work
    const output = ContentService.createTextOutput(JSON.stringify(data));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

// Handle preflight OPTIONS requests for CORS
function doOptions(e) {
  try {
    const output = ContentService.createTextOutput('');
    output.setMimeType(ContentService.MimeType.TEXT);
    
    if (output.setHeader) {
      output.setHeader('Access-Control-Allow-Origin', '*');
      output.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      output.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      output.setHeader('Access-Control-Max-Age', '3600');
    }
    
    return output;
  } catch (error) {
    // Fallback
    return ContentService.createTextOutput('');
  }
}