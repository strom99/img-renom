import { useState } from 'react';
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
  const [selectedImages, setSelectedImages] = useState<ImagenConEstado[]>([]);
  const [valorFormulario, setValorFormulario] =useState<ImagenConEstado[]>([]);
  const [estado,setEstado] = useState(false);
  const renam:any = [];

  console.log('ESTADO', estado);


  const toggleSelection = (img: { img: File, valor: boolean }) => {
    console.log("clicado" , img)
    //cada click a la img

    valorFormulario.map(( img0: any, valor) => {
      console.log(img0)
      if(selectedImages.length == 0){
        setSelectedImages((prev) => [...prev, img])
      }else{
        const exists = selectedImages.some((item) => item.img === img.img);

        if (exists) {
          console.log("Ya estaba seleccionada, la quitamos");
          setSelectedImages((prev) => prev.filter((item) => item.img !== img.img));
        } else {
          console.log("No estaba seleccionada, la añadimos");
          setSelectedImages((prev) => [...prev, img]);
        }
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
          valorFormulario.map((image: any,index) => (
            <ImgView key={index} data={image}  toggleSelect={() => toggleSelection(image)}/>
          ))
        ) : (
          <p>No hay imágenes seleccionadas.</p>
        )}
      </div>
    </>
  )
  

}

