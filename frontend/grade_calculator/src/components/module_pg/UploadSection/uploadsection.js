import { Upload } from 'lucide-react';
import { useDropzone } from "react-dropzone";

export default function UploadSection({
  onDrop,
  file,
  isUploading,
  uploadSuccess,
  isDragActive,
}) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"], "text/plain": [".txt"] },
    multiple: false,
  });

  return (
    <div className="bg-gray-800 rounded-lg p-3 md:p-6">
      <h3 className="text-xl md:text-2xl font-semibold mb-4">
        <br/>
        Upload Course Outline
      </h3>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 ${
          isDragActive ? "border-orange-500 bg-orange-500/10" : "border-gray-600"
        } transition-colors duration-200 cursor-pointer hover:border-orange-500 hover:bg-orange-500/5`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center text-center space-y-4">
          <Upload
            className={`w-8 h-8 ${
              isDragActive ? "text-orange-500" : "text-gray-400"
            }`}
          />
          <div className="space-y-1">
            <p className="text-gray-300">
              Drag & Drop or{" "}
              <span className="text-orange-500 hover:text-orange-400">
                Choose file
              </span>{" "}
              to upload
            </p>
            <p className="text-sm text-gray-500">CSV or TXT</p>
            <p className="text-sm text-white bg-orange-500">
              FEATURE COMING SOON !!
            </p>
          </div>
          {file && <div className="text-sm text-gray-400">Selected: {file.name}</div>}
          {isUploading && <div className="text-sm text-orange-500">Uploading...</div>}
          {uploadSuccess && (
            <div className="text-sm text-green-500">File uploaded successfully!</div>
          )}
        </div>
      </div>
    </div>
  );
}
