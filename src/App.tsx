import { useState } from 'react'
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

  console.log('hijo');

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

type ImageData = {
  file: File;
  status: boolean;
};


export default function App() {
  const [error, setError] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const renam:any = [];
  const [validImages,setValidImages] = useState<ImageData[]>([]);


  const toggleSelection = (img: ImageData) => {
    renam.push(img);

    console.log(renam)
    return !img.status;
  };

  const handleFileChange = (e:any) => {
    const files = e.target.files; // Obtenemos el primer archivo
    const invalidImages = [];
    const validImages: ImageData[] = [];


    // Iteramos por cada archivo para validarlo
    for (let file of files) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        validImages.push({file: file,status: false});
      } else {
        invalidImages.push(file);
      }
    }

    if (invalidImages.length > 0) {
      setError(`Solo se permiten archivos de tipo PNG o JPEG. Archivos no válidos: ${invalidImages.join(', ')}`);
    } else {
      setError('');
    }

    setValidImages((prev) => [...prev, ...validImages]);

    console.log(validImages)
  };

  function verify(image: ImageData){
// arregalr esto
console.log(image)
console.log('primera vuelta en 0')
    //setSe2lectedImages([...selectedImages,image])
    return image.status;
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
          validImages.map((image,index) => (
            <ImgView key={index} data={image.file} isSelected={verify(image)} toggleSelect={() => toggleSelection(image)}/>
          ))
        ) : (
          <p>No hay imágenes seleccionadas.</p>
        )}
      </div>
    </>
  )
  

}

