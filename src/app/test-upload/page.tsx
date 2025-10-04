"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { Factory, ArrowLeft } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  public_id: string;
  status: "uploading" | "success" | "error";
  progress: number;
  error?: string;
}

export default function TestUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
    console.log("Files uploaded:", files);
  };

  const handleFileRemoved = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    console.log("File removed:", fileId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Factory className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">NovaFab</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            File Upload Test
          </h1>
          <p className="text-xl text-gray-600">
            Test the file upload functionality with Cloudinary integration
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
              <CardDescription>
                Upload images, PDFs, or STL files to test the functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFilesUploaded={handleFilesUploaded}
                onFileRemoved={handleFileRemoved}
                maxFiles={5}
                folder="test-uploads"
              />
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Results</CardTitle>
              <CardDescription>
                Successfully uploaded files will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadedFiles.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No files uploaded yet
                </div>
              ) : (
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          {file.name}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>

                      {file.url && (
                        <div className="mb-2">
                          {file.type.startsWith("image/") ? (
                            <img
                              src={file.url}
                              alt={file.name}
                              className="max-w-full h-32 object-cover rounded border"
                            />
                          ) : (
                            <div className="p-4 bg-gray-100 rounded border text-center">
                              <p className="text-sm text-gray-600">
                                File uploaded successfully
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="text-xs text-gray-500 space-y-1">
                        <p>
                          <strong>URL:</strong> {file.url}
                        </p>
                        <p>
                          <strong>Public ID:</strong> {file.public_id}
                        </p>
                        <p>
                          <strong>Type:</strong> {file.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                To test file uploads:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>
                  Sign up for a free Cloudinary account at{" "}
                  <a
                    href="https://cloudinary.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    cloudinary.com
                  </a>
                </li>
                <li>
                  Get your Cloud Name, API Key, and API Secret from the
                  dashboard
                </li>
                <li>Update the .env file with your Cloudinary credentials:</li>
              </ol>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <div>CLOUDINARY_CLOUD_NAME=&quot;your_cloud_name&quot;</div>
              <div>CLOUDINARY_API_KEY=&quot;your_api_key&quot;</div>
              <div>CLOUDINARY_API_SECRET=&quot;your_api_secret&quot;</div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Supported file types:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Images: JPEG, PNG, GIF, WebP</li>
                <li>Documents: PDF</li>
                <li>3D Models: STL files</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Drag and drop file upload</li>
                <li>Progress tracking</li>
                <li>File validation (type and size)</li>
                <li>Error handling and retry</li>
                <li>File removal</li>
                <li>Cloudinary integration for optimized delivery</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
