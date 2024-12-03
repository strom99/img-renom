import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import PropTypes from 'prop-types'; 
import rata from './assets/rata.jpg'


function ImgView({data}){
  if (!data) return null; // Retorna nada si no hay data

  function click(e: React.MouseEvent<HTMLImageElement, MouseEvent>){
    console.log(e.target)
  }


  return (
    <div className='img'>
      <img onClick={click} src={URL.createObjectURL(data)} alt={data.name} />
      <span>{data.name}</span>
    </div>
  )
}


ImgView.prototype = {
  data: PropTypes.string, // Esperamos que `data` sea una cadena (URL de la imagen)
};


export default function App() {
  const [error, setError] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleFileChange = (e:any) => {
    const files = e.target.files; // Obtenemos el primer archivo
    const validImages = [];
    const invalidImages = [];

    // Iteramos por cada archivo para validarlo
    for (let file of files) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        validImages.push(file); // Generamos la URL para imágenes válidas
      } else {
        invalidImages.push(file.name);
      }
    }

    if (invalidImages.length > 0) {
      setError(`Solo se permiten archivos de tipo PNG o JPEG. Archivos no válidos: ${invalidImages.join(', ')}`);
    } else {
      setError('');
    }

    // Actualizamos el estado con las imágenes válidas
    setSelectedImages(validImages);

  };

  return (
    <>
    <div className='form-subida'>
      <form action="post">
        <label className='view' htmlFor={'imagen'}>Subir Imagenes</label>
        <input multiple name='imagen' id='imagen' type="file" accept="image/png, image/jpeg"  onChange={handleFileChange}  />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
      <div className='boxImg'>
      {selectedImages.length > 0 ? (
          selectedImages.map((image, index) => (
            <ImgView key={index} data={image} />
          ))
        ) : (
          <p>No hay imágenes seleccionadas.</p>
        )}
      </div>
    </>
  )
  

}

