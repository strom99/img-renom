// src/services/uploadService.ts

export async function uploadData(pre: string, number: number, images: any[]) {
  const formData = new FormData();
  formData.append('Pre', pre);
  formData.append('Number', number.toString());
images.forEach(item => {
  formData.append("imagenes[]", item.img); // el archivo real
  formData.append("posiciones[]", item.posicion.toString()); // la posición u otros datos
});

  const res = await fetch("http://127.0.0.1:8000/api/upload", {
    method: 'POST',
    body: formData
  });

  if (!res.ok) throw new Error('Error al subir los datos');
  return res.json();
}
