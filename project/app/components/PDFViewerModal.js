"use client";

import { useEffect } from "react";
import { getPDFPreviewUrl } from "@/lib/googleDrive";

export default function PDFViewerModal({ file, onClose }) {
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

  if (!file) return null;

  const previewUrl = getPDFPreviewUrl(file.id);

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
          {/* Overlay to hide pop-out button */}
          <div className="absolute top-2 right-2 w-14 h-14 bg-zinc-800 z-10 pointer-events-none rounded" />
          <style jsx>{`
            iframe {
              pointer-events: auto;
            }
            /* Hide Google Drive toolbar and pop-out buttons */
            :global(.ndfHFb-c4YZDc-GSQQnc-LgbsSe),
            :global(.ndfHFb-c4YZDc-to915-LgbsSe),
            :global([aria-label="Pop out"]),
            :global([aria-label="Open in new window"]) {
              display: none !important;
            }
          `}</style>
          <iframe
            src={`${previewUrl}?rm=minimal&embedded=true`}
            className="w-full h-full border-0"
            title={file.name}
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
}
