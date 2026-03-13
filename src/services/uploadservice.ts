import JSZip from "jszip";

export async function downloadZip(
  pre: string,
  number: number,
  images: Blob[],
  extension: string

) {

  const zip = new JSZip();

  images.forEach((img, i) => {
    zip.file(`${pre}-${number + i}.${extension}`, img);
  });

  const content = await zip.generateAsync({ type: "blob" });

  const url = URL.createObjectURL(content);

  const a = document.createElement("a");
  a.href = url;
  a.download = "imagenes.zip";
  document.body.appendChild(a);
  a.click();
  a.remove();
}