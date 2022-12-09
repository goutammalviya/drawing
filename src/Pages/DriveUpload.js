import React, { useState } from "react";
import useGoogle from "../Services/useGoogle";

function File({ file, showIcon }) {
  const getContent = () => `https://drive.google.com/uc?id=${file.id}`;

  const getThumbnail = () => `https://drive.google.com/thumbnail?id=${file.id}`;

  const getIcon = () =>
    `https://drive-thirdparty.googleusercontent.com/256/type/${file.mimeType}`;

  function render() {
    if (file.mimeType.includes("image"))
      return <img src={getContent()} alt={file.name} width="256" />;
    if (file.mimeType.includes("audio"))
      return <audio src={getContent()} controls width="256" />;
    if (file.mimeType.includes("video"))
      return <video src={getContent()} controls width="256" />;
    else
      return (
        <img
          src={getThumbnail()}
          alt={file.name}
          width="64"
          onError={(e) => {
            window.setTimeout(() => {
              e.target.src = getThumbnail();
            }, 5000);
          }}
        />
      );
  }

  return (
    <div>
      {!showIcon && (
        <div>
          {render()}
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            {file.name}
          </a>
        </div>
      )}
      {showIcon && (
        <div>
          <img src={getIcon()} alt={file.name} width="64" />
          <span>{file.name}</span>
        </div>
      )}
      <hr />
    </div>
  );
}

export default function DriveUpload() {
  const { token, authorize, revoke } = useGoogle();
  const [files, setFiles] = useState([]);
  const [processed, setProcessed] = useState([]);

  function upload(file) {
    const form = new FormData();
    form.append(
      "metadata",
      new Blob(
        [
          JSON.stringify({
            name: file.name,
            mimeType: file.type,
            parents: ['1bTniD9BKHkhRyDBQaKt0cQygnpBptguj'],
          })
        ],
        { type: "application/json" },
        
      )
    );
    form.append("file", file);
    return fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=name,webViewLink,id,mimeType",
      {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: form
      }
    ).then((res) => res.json());
  }

  function handleChange(e) {
    setFiles(Array.from(e.target.files));
  }

  function handleUpload(e) {
    e.preventDefault();
    Promise.all(files.map(upload)).then(shareFiles).then(setProcessed);
  }

  function shareFiles(files) {
    return Promise.all(
      files.map(({ id }) =>
        window.gapi.client.drive.permissions.create({
          fileId: id,
          fields: "id",
          resource: {
            role: "commenter",
            type: "anyone"
          }
        })
      )
    ).then(() => files);
  }

  function toFile(file) {
    return {
      name: file.name,
      mimeType: file.type
    };
  }

  function toProcessed(file) {
    return {
      name: file.name,
      url: file.webViewLink,
      id: file.id,
      mimeType: file.mimeType
    };
  }

  return (
    <div>
      <div>
        <button onClick={token ? revoke : authorize} type="button">
          {token ? "revoke" : "authorize"}
        </button>
      </div>
      <form onSubmit={handleUpload}>
        <input multiple type="file" onChange={handleChange} />
        <button type="submit" disabled={!files.length}>
          upload
        </button>
      </form>
      {files.map(toFile).map((file, i) => (
        <File key={i} file={file} showIcon />
      ))}
      {processed.map(toProcessed).map((file) => (
        <File key={file.id} file={file} />
      ))}
    </div>
  );
}
