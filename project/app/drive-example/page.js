"use client";

import { useState } from "react";
import DriveFolderBrowser from "@/app/components/DriveFolderBrowser";
import PDFViewerModal from "@/app/components/PDFViewerModal";

export default function DriveExamplePage() {
  const [selectedFile, setSelectedFile] = useState(null);

  // Replace with your Google Drive folder ID
  const FOLDER_ID = "1uvvdlSUur-Iqda3DU3pdUp85VKRv-s5l";

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-16 text-zinc-900 sm:px-8 lg:px-10">
      <div
        className="absolute inset-0 -z-20 bg-study-doodle bg-cover bg-center"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-white/95 via-zinc-100/90 to-white/95"
        aria-hidden="true"
      />
      
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-0">
        <header className="flex flex-col gap-4 text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            <span className="text-zinc-900">Browse</span>
            {" "}
            <span className="text-gradient-orange-underline">Drive Folders</span>
          </h1>
          <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">
            Navigate through folders and view PDFs directly on the site
          </p>
        </header>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
          <DriveFolderBrowser 
            folderId={FOLDER_ID}
            onFileClick={(file) => setSelectedFile(file)}
          />
        </div>
      </main>

      {/* PDF Viewer Modal */}
      {selectedFile && (
        <PDFViewerModal 
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
}
