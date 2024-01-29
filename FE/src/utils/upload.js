export function imageUpload(source, setImage) {
    const { files } = source;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    return uploadFile
  }