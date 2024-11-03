import React from 'react';

function useHandleStreamResponse({
  onChunk,
  onFinish
}) {
  const handleStreamResponse = React.useCallback(
    async (response) => {
      if (response.body) {
        const reader = response.body.getReader();
        if (reader) {
          const decoder = new TextDecoder();
          let content = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              onFinish(content);
              break;
            }
            const chunk = decoder.decode(value, { stream: true });
            content += chunk;
            onChunk(content);
          }
        }
      }
    },
    [onChunk, onFinish]
  );
  return handleStreamResponse;
}

function useUpload() {
  function isBase64(str) {
    try {
      return btoa(atob(str)) === str;
    } catch (error) {
      return false;
    }
  }
  const [loading, setLoading] = React.useState(false);
  const upload = async (input) => {
    try {
      setLoading(true);
      let response;
      if ("file" in input) {
        const formData = new FormData();
        formData.append("file", input.file);
        response = await fetch(`${window.location.origin}/api/upload`, {
          method: "POST",
          body: formData
        });
      } else {
        if (!isBase64(input.base64)) {
          return { error: "Provided base64 is invalid" };
        }
        response = await fetch(`${window.location.origin}/api/upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ base64: input.base64 })
        });
      }
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const data = await response.json();
      return { url: data.url, mimeType: data.mimeType || null };
    } catch (uploadError) {
      if (uploadError instanceof Error) {
        return { error: uploadError.message };
      }
      if (typeof uploadError === "string") {
        return { error: uploadError };
      }
      return { error: "Upload failed" };
    } finally {
      setLoading(false);
    }
  };
  return [upload, { loading }];
}

export {
  useHandleStreamResponse,
  rawUseUpload,
}
