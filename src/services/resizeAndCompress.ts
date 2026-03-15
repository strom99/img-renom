import { number } from "prop-types";


export async function resizeAndCompress(file: File, maxWidth = 2000, quality: number, outputFormat: 'webp' | 'jpeg' | 'png' = 'webp'): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const scale = Math.min(1, maxWidth / img.width);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject('No canvas context');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const mimeTypes = {
                webp: "image/webp",
                jpeg: "image/jpeg",
                png: "image/png"
            };

            const mimeType = mimeTypes[outputFormat];            // Convertimos a WebP para bajar tamaño
            canvas.toBlob(blob => {
                if (blob) resolve(blob);
                else reject('Error al generar blob');
            }, mimeType, quality);
        };
        img.onerror = () => reject('Error cargando imagen');
        img.src = URL.createObjectURL(file);
    });
}