import { useState } from 'react';
import { ImagenConEstado } from './App';

type FormularioProps = {
  onChange: (valor: ImagenConEstado[]) => void;
}



export default function Formulario( {onChange}  : FormularioProps) {
    const [error, setError] = useState('');
    const handleFileChange = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            return; // No hacer nada si no se seleccionó ningún archivo
        }
        const files = e.target.files; // Obtenemos el primer archivo
        const invalidImages = [];
        const validImages = [];

        // Iteramos por cada archivo para validarlo
        for (let file of files) {
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                validImages.push({ img: file});
            } else {
                invalidImages.push({ img: file});
            }
        }

        if (invalidImages.length > 0) {
            setError(`Solo se permiten archivos de tipo IMG. Archivos no válidos: ${invalidImages.join(', ')}`);
        } else {
            setError('');
        }

        onChange(validImages);
    };


    return (
        <>
            <div className='form-subida'>
                <form action="post">
                    <label className='view btn' htmlFor={'imagen'}>Subir Imagenes</label>
                    <input multiple name='imagen' id='imagen' type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    );
}