import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import PropTypes from 'prop-types'; 
import rata from './assets/rata.jpg';

interface ImgViewProps {
  data: any,
  isSelected: boolean
  toggleSelect: () => void;
}


const ImgView: React.FC<ImgViewProps> = ({ data, toggleSelect,isSelected}) => {

  if (!data) return null; // Retorna nada si no hay data
  const dynamicStyle = {
    filter: isSelected ? "drop-shadow(1px 8px 26px #ff2fff)" : "",
  };

  return (
    <div style={dynamicStyle} className='img'>
      <img onClick={toggleSelect} src={URL.createObjectURL(data)} alt={data.name} />
      <span>{data.name}</span>
    </div>
  )
}


// ImgView.prototype = {
//   data: PropTypes.string, // Esperamos que `data` sea una cadena (URL de la imagen)
// };


export default function App() {
  const [error, setError] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const renam:any = [];
  const [validImages, setValidImages] = useState<File[]>([]);


  const toggleSelection = (img: File) => {
    console.log(img)

  };

  const handleFileChange = (e:any) => {
    const files = e.target.files; // Obtenemos el primer archivo
    const invalidImages = [];
    const valid = [];

    // Iteramos por cada archivo para validarlo
    for (let file of files) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        valid.push(file);
      } else {
        invalidImages.push(file.name);
      }
    }

    if (invalidImages.length > 0) {
      setError(`Solo se permiten archivos de tipo PNG o JPEG. Archivos no válidos: ${invalidImages.join(', ')}`);
    } else {
      setError('');
    }

    console.log('new'+ valid)
    setValidImages(valid);

  };

  function verify(image:File){

    setSelectedImages([...selectedImages,image])
    return true;
  }



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
      {validImages.length > 0 ? (
          validImages.map((image, index) => (
            <ImgView key={index} data={image} isSelected={verify(image)} toggleSelect={() => toggleSelection(image)}/>
          ))
        ) : (
          <p>No hay imágenes seleccionadas.</p>
        )}
      </div>
    </>
  )
  

}

