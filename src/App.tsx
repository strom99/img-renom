import { useState } from 'react';
import Formulario from './FormularioTemps';
import './App.css';
import rata from './assets/rata.jpg';

interface ImgViewProps {
  data: any,
  toggleSelect: () => void;
}


// Clicar iamgenes en tono violeta
const ImgView: React.FC<ImgViewProps> = ({data,toggleSelect}) => {

  if (!data.img) return null; // Retorna nada si no hay data
  const dynamicStyle = {
    filter: data.valor ? "drop-shadow(1px 8px 26px #ff2fff)" : "",
  };

  return (
    <div style={dynamicStyle} className='img'>
      <img onClick={() => {toggleSelect();} } src={URL.createObjectURL(data.img)} alt={data.img} />
      <span>{data.img.name}</span>
    </div>
  )
}



export default function App() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [valorFormulario, setValorFormulario] =useState<File[]>([]);
  const [estado,setEstado] = useState(false);
  const renam:any = [];

  console.log('ESTADO', estado);


  const toggleSelection = (img: { img: File, valor: boolean }) => {
    console.log("clicado" , img)
    //cada click a la img

    valorFormulario.map((img0, valor) => {
      console.log(img0)
      if(img0 === img.img){
        console.log("iguales")
      }
    })

    // if(!renam.includes(img)){
    //   renam.push(img);
    // }else{
    //   const indice = renam.findIndex((item:File) => item === img)
    //   renam.splice(indice,1)
    // }
  };



  return (
    <>
      <Formulario onChange={setValorFormulario} setEstado={setEstado}/>
      <div className='boxImg'>
      {valorFormulario.length > 0 ? (
          valorFormulario.map((image,index) => (
            <ImgView key={index} data={image}  toggleSelect={() => toggleSelection(image)}/>
          ))
        ) : (
          <p>No hay imágenes seleccionadas.</p>
        )}
      </div>
    </>
  )
  

}

