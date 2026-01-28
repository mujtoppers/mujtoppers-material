"use client";

import { useEffect, useState } from "react";
import { getPDFPreviewUrl } from "@/lib/googleDrive";

export default function PDFViewerModal({ file, onClose }) {
  const [iframeKey, setIframeKey] = useState(Date.now());

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    
    // Handle Escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Reset state when file changes
  useEffect(() => {
    setIframeKey(Date.now());
  }, [file?.id]);

  if (!file) return null;

  // Use Drive preview - works with view-only permissions
  const previewUrl = `${getPDFPreviewUrl(file.id)}?rm=minimal&embedded=true`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative w-full h-full max-w-7xl max-h-screen p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 bg-white rounded-t-2xl p-4 shadow-lg">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-zinc-900 truncate">
              {file.name}
            </h2>
            <p className="text-sm text-zinc-500">
              {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF Document"}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {/* Fallback link to open in Google Drive */}
            <a
              href={`https://drive.google.com/file/d/${file.id}/view`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 h-10 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium transition"
              title="Open in Google Drive"
            >
              Can't see? Open in Drive ↗
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="relative w-full h-[calc(100%-5rem)] bg-white rounded-b-2xl shadow-2xl overflow-hidden">
          {/* Branded overlay to hide pop-out button */}
          <div className="absolute top-0 right-0 z-10 pointer-events-none bg-zinc-800 p-2 rounded-bl-lg shadow-lg">
            <img src="/favicon.ico" alt="MujToppers" className="w-10 h-10" />
          </div>
          <iframe
            key={iframeKey}
            src={previewUrl}
            className="w-full h-full border-0"
            title={file.name}
            frameBorder="0"
            allow="autoplay"
            referrerPolicy="no-referrer-when-downgrade"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
