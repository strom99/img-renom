import { useState } from 'react'
import './App.css';
import PropTypes from 'prop-types'; 
import rata from './assets/rata.jpg';

interface ImgViewProps {
  state: boolean,
  data: any,
  toggleSelect: () => void;
}


const ImgView: React.FC<ImgViewProps> = ({ state,data,toggleSelect}) => {
  const [estado,setEstado] = useState(state);

  console.log(data)
  console.log(estado)
  console.log('  ')
  if (!data) return null; // Retorna nada si no hay data
  const dynamicStyle = {
    filter: estado ? "drop-shadow(1px 8px 26px #ff2fff)" : "",
  };

  return (
    <div style={dynamicStyle} className='img'>
      <img onClick={() => {setEstado(!estado);toggleSelect();} } src={URL.createObjectURL(data)} alt={data.name} />
      <span>{data.name}</span>
    </div>
  )
}




export default function App() {
  const initial = false;
  const [error, setError] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const renam:any = [];
  const [validImages,setValidImages] = useState<File[]>([]);


  const toggleSelection = (img: File) => {
    //cada click a la img
    if(!renam.includes(img)){
      renam.push(img);
    }else{
      const indice = renam.findIndex((item:File) => item === img)
      renam.splice(indice,1)
    }

    console.log(renam)

  };

  const handleFileChange = (e:any) => {
    if (!e.target.files || e.target.files.length === 0) {
      return; // No hacer nada si no se seleccionó ningún archivo
    }
    console.log('proceso de selecciopn')
    const files = e.target.files; // Obtenemos el primer archivo
    const invalidImages = [];
    const validImages: File[] = [];


    // Iteramos por cada archivo para validarlo
    for (let file of files) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        validImages.push(file);
      } else {
        invalidImages.push(file);
      }
    }

    if (invalidImages.length > 0) {
      setError(`Solo se permiten archivos de tipo PNG o JPEG. Archivos no válidos: ${invalidImages.join(', ')}`);
    } else {
      setError('');
    }

    setValidImages(validImages);
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
      {validImages.length > 0 ? (
          validImages.map((image,index) => (
            <ImgView state={initial} key={index} data={image}  toggleSelect={() => toggleSelection(image)}/>
          ))
        ) : (
          <p>No hay imágenes seleccionadas.</p>
        )}
      </div>
    </>
  )
  

}

