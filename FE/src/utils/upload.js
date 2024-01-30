// export function imageUpload(source, setImage) {
//     const { files } = source;
//     const uploadFile = files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(uploadFile);
//     reader.onloadend = () => {
//       setImage(reader.result);
//     };
//     return uploadFile
//   }

export function imageUpload(source, setImage) {
  const { files } = source;
  console.log(files)
  const uploadedImages = [];

  const uploadImage = (index) => {
    if (index < files.length) {
      const uploadFile = files[index];
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        // 이미지를 배열에 추가
        uploadedImages.push(reader.result);
        // 재귀 호출로 다음 이미지 업로드
        uploadImage(index + 1);
      };
    } else {
      // 모든 이미지 업로드가 완료되면 setImage 호출
      setImage(uploadedImages);
    }
  };

  // 첫 번째 이미지 업로드 시작
  uploadImage(0);

  // 마지막 이미지 파일 반환 (실제로 사용하지 않는 경우에도 반환해 둘 수 있음)
  // return files[files.length - 1];
  return files
}