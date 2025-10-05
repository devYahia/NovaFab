"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  File,
  Image,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logger from "@/lib/logger";

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

interface FileUploadProps {
  onFilesUploaded?: (files: UploadedFile[]) => void;
  onFileRemoved?: (fileId: string) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  folder?: string;
  className?: string;
  disabled?: boolean;
}

const defaultAcceptedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "model/stl",
  "application/octet-stream",
];

export function FileUpload({
  onFilesUploaded,
  onFileRemoved,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = defaultAcceptedTypes,
  folder = "novafab",
  className,
  disabled = false,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    if (type === "application/pdf") return FileText;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.size > maxSize) {
        return `File size too large. Maximum size is ${formatFileSize(maxSize)}.`;
      }
      if (!acceptedTypes.includes(file.type)) {
        return "Invalid file type.";
      }
      return null;
    },
    [maxSize, acceptedTypes],
  );

  const uploadFile = useCallback(
    async (file: File): Promise<UploadedFile> => {
      const fileId = Math.random().toString(36).substr(2, 9);

      logger.info("Starting file upload", "UPLOAD_COMPONENT", { 
        fileName: file.name, 
        fileSize: file.size, 
        fileType: file.type,
        fileId 
      });

      const uploadedFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: "",
        public_id: "",
        status: "uploading",
        progress: 0,
      };

      setFiles((prev) => [...prev, uploadedFile]);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        logger.debug("Sending upload request", "UPLOAD_COMPONENT", { 
          fileName: file.name, 
          folder,
          fileId 
        });

        // Simulate progress
        const progressInterval = setInterval(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? { ...f, progress: Math.min(f.progress + 10, 90) }
                : f,
            ),
          );
        }, 200);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);

        if (!response.ok) {
          const error = await response.json();
          logger.error("Upload request failed", "UPLOAD_COMPONENT", { 
            fileName: file.name, 
            status: response.status,
            error: error.error,
            fileId 
          });
          throw new Error(error.error || "Upload failed");
        }

        const result = await response.json();

        logger.info("File upload successful", "UPLOAD_COMPONENT", { 
          fileName: file.name, 
          url: result.url,
          publicId: result.public_id,
          fileId 
        });

        const successFile: UploadedFile = {
          ...uploadedFile,
          url: result.url,
          public_id: result.public_id,
          status: "success",
          progress: 100,
        };

        setFiles((prev) =>
          prev.map((f) => (f.id === fileId ? successFile : f)),
        );

        return successFile;
      } catch (error) {
        logger.error("File upload failed", "UPLOAD_COMPONENT", { 
          fileName: file.name, 
          error: error instanceof Error ? error.message : "Upload failed",
          fileId 
        });

        const errorFile: UploadedFile = {
          ...uploadedFile,
          status: "error",
          progress: 0,
          error: error instanceof Error ? error.message : "Upload failed",
        };

        setFiles((prev) => prev.map((f) => (f.id === fileId ? errorFile : f)));

        return errorFile;
      }
    },
    [folder],
  );

  const handleFiles = useCallback(
    async (fileList: FileList) => {
      if (disabled) return;

      const newFiles = Array.from(fileList);

      // Check max files limit
      if (files.length + newFiles.length > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Validate files
      const validFiles: File[] = [];
      for (const file of newFiles) {
        const error = validateFile(file);
        if (error) {
          alert(`${file.name}: ${error}`);
          continue;
        }
        validFiles.push(file);
      }

      if (validFiles.length === 0) return;

      // Upload files
      const uploadPromises = validFiles.map(uploadFile);
      const uploadedFiles = await Promise.all(uploadPromises);

      if (onFilesUploaded) {
        onFilesUploaded(uploadedFiles.filter((f) => f.status === "success"));
      }
    },
    [
      files.length,
      maxFiles,
      disabled,
      onFilesUploaded,
      uploadFile,
      validateFile,
    ],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      if (disabled) return;

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        handleFiles(droppedFiles);
      }
    },
    [handleFiles, disabled],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        handleFiles(selectedFiles);
      }
      // Reset input value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleFiles],
  );

  const removeFile = async (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    
    logger.info("Removing file", "UPLOAD_COMPONENT", { 
      fileId, 
      fileName: file?.name,
      publicId: file?.public_id 
    });

    if (file && file.public_id) {
      try {
        logger.debug("Sending delete request", "UPLOAD_COMPONENT", { 
          fileId, 
          publicId: file.public_id 
        });

        const response = await fetch(`/api/upload?public_id=${file.public_id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          logger.warn("Delete request failed", "UPLOAD_COMPONENT", { 
            fileId, 
            status: response.status 
          });
        } else {
          logger.info("File deleted from server", "UPLOAD_COMPONENT", { 
            fileId, 
            fileName: file.name 
          });
        }
      } catch (error) {
        logger.error("Error deleting file from server", "UPLOAD_COMPONENT", { 
          fileId, 
          error: error instanceof Error ? error.message : "Delete failed" 
        });
      }
    }

    setFiles((prev) => prev.filter((f) => f.id !== fileId));

    if (onFileRemoved) {
      onFileRemoved(fileId);
    }

    logger.info("File removed from UI", "UPLOAD_COMPONENT", { fileId });
  };

  const retryUpload = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (file && file.status === "error") {
      // Create a new File object from the stored data
      // Note: This is a simplified retry - in a real app you'd store the original File
      // Retry upload functionality would be implemented here
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragOver && !disabled
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300",
          disabled ? "opacity-50 cursor-not-allowed" : "hover:border-gray-400",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <CardContent className="p-8 text-center">
          <Upload
            className={cn(
              "h-12 w-12 mx-auto mb-4",
              isDragOver && !disabled ? "text-blue-500" : "text-gray-400",
            )}
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isDragOver ? "Drop files here" : "Upload files"}
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop files here, or click to select files
          </p>
          <div className="text-sm text-gray-500">
            <p>
              Maximum {maxFiles} files, up to {formatFileSize(maxSize)} each
            </p>
            <p>Supported: Images, PDF, STL files</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(",")}
            onChange={handleFileInput}
            className="hidden"
            disabled={disabled}
          />
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Uploaded Files</h4>
          {files.map((file) => {
            const FileIcon = getFileIcon(file.type);

            return (
              <Card key={file.id} className="p-4">
                <div className="flex items-center space-x-3">
                  <FileIcon className="h-8 w-8 text-gray-400 flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        {file.status === "uploading" && (
                          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                        )}
                        {file.status === "success" && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {file.status === "error" && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatFileSize(file.size)}</span>
                      <Badge
                        variant={
                          file.status === "success"
                            ? "default"
                            : file.status === "error"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {file.status}
                      </Badge>
                    </div>

                    {file.status === "uploading" && (
                      <Progress value={file.progress} className="mt-2" />
                    )}

                    {file.status === "error" && file.error && (
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-red-600">{file.error}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => retryUpload(file.id)}
                          className="h-6 text-xs"
                        >
                          Retry
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}