// upload image on cloudainary
const url = `https://api.cloudinary.com/v1_1/dxojbq6xz/image/upload`;

const UploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_grocery_store");
  const dataResponse = await fetch(url, {
    method: "post",
    body: formData,
  });
  return dataResponse.json();
};

export default UploadImage;
