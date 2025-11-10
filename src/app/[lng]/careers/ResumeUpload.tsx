// app/careers/ResumeUpload.tsx
'use client';

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const ResumeUpload = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
    noClick: true,
  });

  return (
    <div className="resume-upload-container">
      {/* Drag & Drop Area */}
      <div
        {...getRootProps()}
        className={`resume-dropzone ${isDragActive ? "drag-active" : ""}`}
      >
        <Image
          src="https://contents.trinity-metals.com/wp-content/uploads/2025/03/Vector.svg"
          alt="Upload"
          width={24}
          height={24}
          onClick={open}
          className="upload-icon"
        />
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="dropzone-text">{t("careers.resume.drop-here")}</p>
        ) : (
          <p className="dropzone-text">
            {t("careers.resume.drag-drop")} <br />
            <span className="or-text">{t("careers.resume.or")}</span>
          </p>
        )}
        <button
          type="button"
          onClick={open}
          className={`upload-btn ${isHovered ? "hovered" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {t("careers.resume.upload-button")}
        </button>
      </div>

      {/* File Preview */}
      {file && (
        <div className="file-preview">
          <p>
            <strong>{t("careers.resume.uploaded")}:</strong> {file.name}
          </p>
          <p className="file-size">
            {t("careers.resume.size")}: {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;