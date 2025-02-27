export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({ file }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
  
    const data = await response.json();
    return data.url; // Возвращаем URL загруженного изображения
  }
  