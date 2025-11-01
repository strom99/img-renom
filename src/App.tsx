import { useState, useEffect } from 'react';
import Formulario from './FormularioTemps';
import './App.css';
import rata from './assets/rata.jpg';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


interface ImgViewProps {
  data: any,
  pos: number,
  toggleSelect: () => void;
}

export type ImagenConEstado = {
  img: File;
  valor: boolean;
  posicion: number;
};



// Clicar iamgenes en tono violeta
const ImgView: React.FC<ImgViewProps> = ({pos, data, toggleSelect }) => {

  if (!data.img) return null; // Retorna nada si no hay data
  const dynamicStyle = {
    filter: data.valor ? "drop-shadow(1px 8px 26px #ff2fff)" : "",
  };

  return (
    <div style={dynamicStyle} className='img'>
      {data.valor && <div className='number'>{pos}</div>}
      <img onClick={() => { toggleSelect(); }} src={URL.createObjectURL(data.img)} alt={data.img.name} />
      <span>{data.img.name}</span>
    </div>
  )
}



export default function App() {
  const [selectedImages, setSelectedImages] = useState<ImagenConEstado[]>([]);
  const [valorFormulario, setValorFormulario] = useState<ImagenConEstado[]>([]);
  const renam: any = [];
const [contador, setContador] = useState(0)

    const [openPop,setOpenPop] = useState(false);
    

  const toggleSelection = (img: ImagenConEstado) => {
    setValorFormulario((prev) =>
      prev.map((item) =>{
        if(item.img === img.img){
          const nuevapos = contador +1;
          setContador(nuevapos)
          return { ...item, valor: !item.valor, posicion: nuevapos }
        }else{
          return item;
        }
      })
    );

  };

  // Mantiene selectedImages sincronizado automáticamente
  useEffect(() => {
    const filtered = valorFormulario.filter((item) => item.valor);
    setSelectedImages(filtered);
    console.log(selectedImages)
  }, [valorFormulario]);



  return (
    <>
      <Formulario onChange={setValorFormulario} />
      <div className='boxImg'>
        {valorFormulario.length > 0 ? (
          valorFormulario.map((image: any, index) => (
            <ImgView key={index} pos={image.posicion} data={image} toggleSelect={() => toggleSelection(image)} />
          ))
        ) : (
          <p>No hay imágenes seleccionadas.</p>
        )}
      </div>
      <div className='boxRename'>
        {selectedImages.length > 0 && <button className='btn btn-general' onClick={() => setOpenPop(true)}>Renombrarrr <img src="src/assets/flecha.png" alt="" /> </button>}
          <Popup closeOnDocumentClick={false} modal open={openPop}>
              <form action="">
              <label htmlFor="">Valor: </label>
              <input defaultValue={"Img"} type="text" />
              <span><b>-</b></span>
              <input type="number" defaultValue={0} />4
                    <button type='button' className="close" onClick={() => setOpenPop(false)}>Cancelar</button>
            </form>
          </Popup>
      </div>
    </>
  )

}

