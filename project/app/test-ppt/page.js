"use client";

import { useState } from "react";
import PPTViewerModal from "@/app/components/PPTViewerModal";

export default function TestPPTPage() {
  const [showPresentation, setShowPresentation] = useState(false);

  // Example file object for the presentation
  const examplePresentation = {
    id: "1Vf-d7YVPn7PzoZeO-p0Rg3eC40P-aOS5",
    name: "Test Presentation.pptx",
    mimeType: "application/vnd.google-apps.presentation"
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-6">
          Google Slides Viewer Test
        </h1>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-zinc-600 mb-4">
            Click the button below to test viewing your Google Slides presentation directly on the website.
          </p>
          
          <button
            onClick={() => setShowPresentation(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
          >
            📊 Open Test Presentation
          </button>

          <div className="mt-6 p-4 bg-zinc-50 rounded-lg">
            <h3 className="font-semibold text-zinc-900 mb-2">Features:</h3>
            <ul className="space-y-1 text-sm text-zinc-600">
              <li>✓ View Google Slides presentations embedded in your site</li>
              <li>✓ Navigate through slides with built-in controls</li>
              <li>✓ Full-screen support</li>
              <li>✓ Close with ESC key or close button</li>
            </ul>
          </div>
        </div>
      </div>

      {/* PPT Viewer Modal */}
      {showPresentation && (
        <PPTViewerModal 
          file={examplePresentation}
          onClose={() => setShowPresentation(false)}
        />
      )}
    </div>
  );
}
