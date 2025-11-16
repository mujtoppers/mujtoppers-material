# Google Drive Integration Setup

## Setup Instructions

### 1. Get API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google Drive API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Drive API"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated API key

### 2. Configure Environment Variable
Edit `.env.local` and add your API key:
```env
NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY=your_actual_api_key_here
```

### 3. Make Drive Folders Public
For each folder you want to share:
1. Right-click the folder in Google Drive
2. Click "Share"
3. Change to "Anyone with the link"
4. Set permission to "Viewer"
5. Copy the folder ID from the URL

**Folder URL format:**
```
https://drive.google.com/drive/folders/FOLDER_ID_HERE
                                         ^^^^^^^^^^^^^^
                                         Copy this part
```

### 4. Test the Integration
1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/drive-example`
3. Replace `YOUR_FOLDER_ID_HERE` with your actual folder ID

## How to Use in Your Pages

### Example: AIML 2nd Year with Drive Folders

```javascript
"use client";

import { useState } from "react";
import DriveFolderBrowser from "@/app/components/DriveFolderBrowser";
import PDFViewerModal from "@/app/components/PDFViewerModal";

export default function AIMLPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [openYear, setOpenYear] = useState(null);

  const years = [
    {
      id: "2nd-year",
      title: "2nd Year",
      // Put your Google Drive folder ID here
      driveFolderId: "YOUR_2ND_YEAR_FOLDER_ID",
    },
    // ... other years
  ];

  return (
    <div>
      {/* Your existing UI */}
      
      {/* When user clicks to view resources */}
      {openYear && (
        <div className="modal">
          <DriveFolderBrowser 
            folderId={openYear.driveFolderId}
            onFileClick={(file) => setSelectedFile(file)}
          />
        </div>
      )}
      
      {/* PDF Viewer */}
      {selectedFile && (
        <PDFViewerModal 
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
}
```

## Components

### DriveFolderBrowser
Displays folders and files from Google Drive with navigation.

**Props:**
- `folderId` (string): Google Drive folder ID
- `onFileClick` (function): Called when a PDF is clicked

### PDFViewerModal
Full-screen modal to view PDFs.

**Props:**
- `file` (object): File object from Drive API
- `onClose` (function): Called when modal is closed

## Features

✅ Browse folders and subfolders
✅ View PDFs in full-screen modal
✅ Breadcrumb navigation
✅ Back button
✅ File type detection (folders, PDFs, other files)
✅ File size display
✅ "Open in Drive" fallback button
✅ Keyboard support (ESC to close)
✅ Responsive design

## Important Notes

1. **API Limits**: Google Drive API has quota limits (1,000 requests per 100 seconds per user)
2. **Public Access**: Folders must be set to "Anyone with the link" for the API to work
3. **File Types**: Currently supports all file types; PDFs open in modal, others in new tab
4. **Security**: API key is client-side (public), so restrict it in Google Cloud Console to your domain only

## Next Steps

Want me to:
1. Integrate this into your AIML page?
2. Add folder IDs for all subjects?
3. Customize the styling to match your site better?
