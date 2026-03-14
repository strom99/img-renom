import { useState } from 'react';
import Formulario from './FormularioTemps';
import './App.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useRef } from 'react';
import {downloadZip} from './services/uploadservice'

import { resizeAndCompress } from './services/resizeAndCompress';


interface ImgViewProps {
  data: any,
  pos: number,
  toggleSelect: () => void;
  isSelected: boolean
}

export type ImagenConEstado = {
  img: File;
  // posicion: number;
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
  const [number, setNumber] = useState(1);
  const [openPop, setOpenPop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function sendData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const extension = 'webp';
    setLoading(true);

    try {
      // cambiar tamaño imagenes y transformacion WEBP
      const processedFiles: Blob[] = [];
      for (const file of selectedImages) {
        if (file.img.type.startsWith('image/')) {
          const compressed = await resizeAndCompress(file.img, undefined, undefined, extension as 'webp' | 'jpeg');
          processedFiles.push(compressed);
        }
      }

      downloadZip(pre,number,processedFiles,extension);


    } catch (error) {
      console.error('Hubo un error:', error);
    } finally {
      setLoading(false);
      setSelectedImages([]);
      setValorFormulario([]);
      if (formRef.current) {
        formRef.current.reset(); // 🔹 esto reinicia todos los inputs a defaultValue
      }
      setOpenPop(false)
    }

  }

  function validatePre(e: any) {
    setPre(e.target.value)
    e.target.setCustomValidity("");

    if (e.target.validity.valueMissing) {
      e.target.reportValidity();
      e.target.setCustomValidity("El nombre de la imagen es requerido");
      console.log('No puede estar vacio')
    }

    if (!/^[a-zA-Z]+$/.test(e.target.value)) {
      e.target.reportValidity();
      e.target.setCustomValidity("Solo letras, sin espacios en blanco");
    }

    if (e.target.value.length > 6 || e.target.validity.tooLong) {
      e.target.reportValidity();
      e.target.setCustomValidity("Maximo 6 caracteres");
    }

  }

  function validateNumber(e: any) {
    const input = e.target;
    setNumber(parseInt(input.value))
    input.setCustomValidity("");

    // Validar manualmente
    if (input.validity.badInput) {
      input.setCustomValidity("Caracter invalido");
    } else if (input.value === "" || isNaN(Number(input.value))) {
      input.setCustomValidity("Debes ingresar un número");
    } else if (input.validity.valueMissing) {
      input.setCustomValidity("Campo obligatorio");
    } else if (input.validity.rangeUnderflow) {
      input.setCustomValidity(`El valor mínimo es ${input.min}`);
    } else if (input.validity.rangeOverflow) {
      input.setCustomValidity(`El valor máximo es ${input.max}`);
    }

    // Mostrar mensaje si hay error
    input.reportValidity();
  }

  const toggleSelection = (img: ImagenConEstado) => {
    if (selectedImages.includes(img)) {
      setSelectedImages(prev => prev.filter(image => image !== img))
    } else {
      setSelectedImages(prev => [...prev, img])
    }
  };


  function checkFormReady() {
    if (formRef.current) {
      setIsReady(formRef.current.checkValidity())
    }
  }

  function abrirPop(){
    setOpenPop(true)
    setIsReady(true)
  }


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
        {selectedImages.length > 0 && <button className='btn btn-general' onClick={() => abrirPop()}>Continuar <img src="src/assets/flecha.png" alt="" /> </button>}
        <Popup className='popup' closeOnDocumentClick={false} modal open={openPop}>
          <form ref={formRef} className='formRename' onSubmit={sendData}>
            <div className='flex'>
              <label htmlFor="">Valor: </label>
              <div>
                <input onInput={(e) => { validatePre(e); checkFormReady(); }} pattern="^[a-zA-Z]+$" name='pre' minLength={1} maxLength={6} defaultValue={pre} type="text" required />
                <span><b>-</b></span>
                <input onInput={(e) => { validateNumber(e); checkFormReady(); }} type="number" defaultValue={number} min={0} max={50} maxLength={3} required /></div>
            </div>
            <div className='btns'>
              <button type='button' className="close" onClick={() => setOpenPop(false)}>Cancelar</button>
              <button type='submit' className='ok' disabled={loading || !isReady}>Renombrar</button>
            </div>
          </form>

          {loading && (
            <div className="loader">
              Subiendo y preparando ZIP...
            </div>
          )}

        </Popup>
      </div>
    </>
  )

}

