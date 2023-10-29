import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getFile = async (req, res) => {
  try {
    const file_id = req.params.id;
    const filePath = path.join(__dirname, `../uploads/${file_id}`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }
    // Determine the content type based on the file extension
    const fileExtension = path.extname(filePath).toLowerCase();
    let contentType = "application/octet-stream"; // Default to binary data
    if (fileExtension === ".png") {
      contentType = "image/png";
    } else if (fileExtension === ".jpg" || fileExtension === ".jpeg") {
      contentType = "image/jpeg";
    } else if (fileExtension === ".webp") {
      contentType = "image/webp";
    }
    res.setHeader("Content-Type", contentType);
    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const postMedia = async (file) => {
  const file_type = file.mimetype.includes("image") ? "image" : "video";
  if (file_type === "image") {
    const media_url =
      process.env.BASE_API_URL +
      "/" +
      path.join("uploads", file.filename).replace(/\\/g, "/");
    return { url: media_url, success: true, type: "image" };
  } else if (file_type === "video") {
    return postVideo(file.filename);
  }

  return { url: null, success: false, type: null };
};
export const deleteMedia = async (media_dirpath) => {
  try {
    fs.unlink(media_dirpath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return false;
      } else {
        return true;
      }
    });
  } catch (error) {
    return false;
  }
};
const postVideo = async (filename) => {
  // CONFIGURE cloudinary //
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  const newFileName = filename.substring(0, filename.lastIndexOf("."));
  const options = {
    resource_type: "video",
    public_id: `videos/${newFileName}`,
    chunk_size: 6000000,
    eager_async: true,
  };
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const media_dirpath = path.join(__dirname, `../uploads/${filename}`);

  try {
    // Upload the video
    const result = await cloudinary.v2.uploader.upload(
      `${media_dirpath}`,
      options
    );
    console.log(result);

    if (result.secure_url) {
      deleteMedia(media_dirpath);
      return { url: result.secure_url, success: true, type: "video" };
    }
  } catch (error) {
    return { url: null, success: false, type: null };
  }
};
