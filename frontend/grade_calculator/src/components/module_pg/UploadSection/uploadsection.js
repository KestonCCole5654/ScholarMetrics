import React from 'react'
import { Upload, FileText, AlertCircle, Crown } from 'lucide-react'
import { useDropzone } from "react-dropzone"

export default function UploadSection({
  onDrop,
  file,
  isUploading,
  uploadSuccess,
  isDragActive
}) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"], "text/plain": [".txt"] },
    multiple: false,
  })

  return (
    <div className="w-full mx-auto bg-gray-800 relative">
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full flex items-center space-x-1">
          <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-[10px] sm:text-xs">Premium Feature</span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-left text-white mb-2">Upload Outline</h2>
        <p className="text-gray-400 text-left mb-6">
          Upload your outline in supported PDF Format
        </p>

        <div className="space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 h-64 flex flex-col items-center justify-center text-center space-y-4 transition-colors duration-200 cursor-pointer ${isDragActive ? "border-orange-500 bg-orange-500/10" : "border-gray-600 hover:border-orange-500 hover:bg-orange-500/5"
              }`}
          >
            <input {...getInputProps()} />
            <Upload
              className={`w-12 h-12 ${isDragActive ? "text-orange-500" : "text-gray-400"
                }`}
            />
            <div className="space-y-2">
              <p className="text-gray-300 text-lg">
                Drag & Drop or{" "}
                <span className="text-orange-500 hover:text-orange-400 font-semibold">
                  Choose file
                </span>{" "}
                to upload
              </p>
              <p className="text-sm text-gray-500">Supported format: PDF</p>
            </div>
          </div>
          {file && (
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 flex items-start">
              <FileText className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-400">Selected File</h3>
                <p className="text-sm text-blue-300">{file.name}</p>
              </div>
            </div>
          )}
          {isUploading && (
            <div className="space-y-2">
              <p className="text-sm text-orange-500">Uploading...</p>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-orange-500 h-2.5 rounded-full w-1/3"></div>
              </div>
            </div>
          )}
          {uploadSuccess && (
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-400">Success</h3>
              <p className="text-sm text-green-300">File uploaded successfully!</p>
            </div>
          )}

          <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm text-left font-medium text-yellow-400">Coming Soon</h3>
              <p className="text-sm text-left text-yellow-300">This premium feature will be available shortly.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

