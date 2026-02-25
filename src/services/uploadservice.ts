// src/services/uploadService.ts

export async function uploadData(pre: string, number: number, images: any[]) {
  const formData = new FormData();
  formData.append('Pre', pre);
  formData.append('Number', number.toString());
  images.forEach(item => {
    formData.append("imagenes[]", item.img); // el archivo real
    // formData.append("posiciones[]", item.posicion.toString()); // la posición u otros datos
  });

  const res = await fetch("http://127.0.0.1:8000/api/upload", {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    const text = await res.text(); // contenido que envía Laravel
    throw new Error(`Error al subir los datos: ${res.status} ${text}`);
  }
  // ✅ Recibir como blob
  const blob = await res.blob();

  // Crear URL temporal para descargar
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'imagenes.zip'; // nombre del archivo
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
