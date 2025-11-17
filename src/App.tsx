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
  isSelected: boolean
}

export type ImagenConEstado = {
  img: File;
  posicion: number;
};



// Clicar iamgenes en tono violeta
const ImgView: React.FC<ImgViewProps> = ({ pos, data, toggleSelect, isSelected }) => {

  if (!data.img) return null; // Retorna nada si no hay data
  const dynamicStyle = {
    filter: isSelected ? "drop-shadow(1px 8px 26px #ff2fff)" : "",
  };

  return (
    <div style={dynamicStyle} className='img'>
      {isSelected && <div className='number'>{pos + 1}</div>}
      <img onClick={() => { toggleSelect(); }} src={URL.createObjectURL(data.img)} alt={data.img.name} />
      <span>{data.img.name}</span>
    </div>
  )
}



export default function App() {
  const [selectedImages, setSelectedImages] = useState<ImagenConEstado[]>([]);
  const [valorFormulario, setValorFormulario] = useState<ImagenConEstado[]>([]);
  const [pre, setPre] = useState('Img');
  const renam: any = [];
  const [contador, setContador] = useState(0)

  const [openPop, setOpenPop] = useState(false);

  function sendData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget)
    console.log(formdata);
  }

  function validatePre(e: any) {
    setPre(e.target.value)
    e.target.setCustomValidity("");
    console.log(e.target.validity)

    if (e.target.validity.valueMissing) {
      e.target.reportValidity();
      e.target.setCustomValidity("El nombre de la imagen es requerido");
      console.log('No puede estar vacio')
    }

    if(!/^[a-zA-Z\s]+$/.test(e.target.value)){
      e.target.reportValidity();
      e.target.setCustomValidity("Solo se permiten letras");
      console.log('Solo se permiten letras')
    }

  }

  const toggleSelection = (img: ImagenConEstado) => {
    if (selectedImages.includes(img)) {
      setSelectedImages(prev => prev.filter(image => image !== img))
    } else {
      setSelectedImages(prev => [...prev, img])
    }
  };





  return (
    <>
      <Formulario onChange={imagenes => {
        setValorFormulario(imagenes);
        setSelectedImages([]);
      }} />
      <div className='boxImg'>
        {valorFormulario.length > 0 ? (
          valorFormulario.map((image: any, index) => (
            <ImgView key={index} isSelected={
              selectedImages.includes(image)
            } pos={selectedImages.indexOf(image)} data={image} toggleSelect={() => toggleSelection(image)} />
          ))
        ) : (
          <p>No hay imágenes seleccionadas.</p>
        )}
      </div>
      <div className='boxRename'>
        {selectedImages.length > 0 && <button className='btn btn-general' onClick={() => setOpenPop(true)}>Continuar <img src="src/assets/flecha.png" alt="" /> </button>}
        <Popup className='popup' closeOnDocumentClick={false} modal open={openPop}>
          <form className='formRename' onSubmit={sendData} action="{}">
            <div className='flex'>
              <label htmlFor="">Valor: </label>
              <div>
                <input onInput={validatePre} pattern="^[a-zA-Z]+$" name='pre' defaultValue={pre} type="text" required />
                <span><b>-</b></span>
                <input type="number" defaultValue={0} min={0} /></div>
            </div>
            <div className='btns'>
              <button type='button' className="close" onClick={() => setOpenPop(false)}>Cancelar</button>
              <button type='submit' className='ok'>Renombrar</button>
            </div>
          </form>
        </Popup>
      </div>
    </>
  )

}

