import { CldImage } from 'next-cloudinary';

export default function ImageComponent() {
  return (
    <CldImage
      src="sample" // Public ID изображения в Cloudinary
      alt="Example Image"
      width={500}
      height={300}
    />
  );
}