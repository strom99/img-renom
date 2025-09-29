import { useState, useEffect } from 'react';
import Formulario from './FormularioTemps';
import './App.css';
import rata from './assets/rata.jpg';

interface ImgViewProps {
  data: any,
  toggleSelect: () => void;
}

export type ImagenConEstado = {
  img: File;
  valor: boolean;
};



// Clicar iamgenes en tono violeta
const ImgView: React.FC<ImgViewProps> = ({ data, toggleSelect }) => {

  if (!data.img) return null; // Retorna nada si no hay data
  const dynamicStyle = {
    filter: data.valor ? "drop-shadow(1px 8px 26px #ff2fff)" : "",
  };

  return (
    <div style={dynamicStyle} className='img'>
      <img onClick={() => { toggleSelect(); }} src={URL.createObjectURL(data.img)} alt={data.img} />
      <span>{data.img.name}</span>
    </div>
  )
}



export default function App() {
  const [selectedImages, setSelectedImages] = useState<ImagenConEstado[]>([]);
  const [valorFormulario, setValorFormulario] = useState<ImagenConEstado[]>([]);
  const [estado, setEstado] = useState(false);
  const renam: any = [];

  console.log('ESTADO', estado);

  const toggleSelection = (img: ImagenConEstado) => {
    setValorFormulario((prev) =>
      prev.map((item) =>
        item.img === img.img ? { ...item, valor: !item.valor } : item
      )
    );
  };

  // Mantiene selectedImages sincronizado automáticamente
  useEffect(() => {
    const filtered = valorFormulario.filter((item) => item.valor);
    setSelectedImages(filtered);

  }, [valorFormulario]);





return (
  <>
    <Formulario onChange={setValorFormulario} setEstado={setEstado} />
    <div className='boxImg'>
      {valorFormulario.length > 0 ? (
        valorFormulario.map((image: any, index) => (
          <ImgView key={index} data={image} toggleSelect={() => toggleSelection(image)} />
        ))
      ) : (
        <p>No hay imágenes seleccionadas.</p>
      )}
    </div>
  </>
)

}

