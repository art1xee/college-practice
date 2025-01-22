import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { file } = req.body;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: 'photo', // Укажите папку для сохранения изображений
    });

    return res.status(200).json({ url: uploadResponse.secure_url });
  } catch (error) {
    return res.status(500).json({ message: 'Upload failed', error });
  }
}


