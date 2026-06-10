// Avatar image storage (Neon has no file storage). Unsigned browser upload to
// Cloudinary -> returns a hosted URL stored on the user's profile.
const CLOUD_NAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImage(file) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary not configured: set VITE_APP_CLOUDINARY_CLOUD_NAME and VITE_APP_CLOUDINARY_UPLOAD_PRESET in .env"
    );
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  if (!res.ok) {
    console.error(await res.json().catch(() => ({})));
    throw new Error("Image could not be uploaded to Cloudinary");
  }
  const data = await res.json();
  return data.secure_url;
}
