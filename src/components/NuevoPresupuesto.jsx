import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({
	presupuesto,
	setPresupuesto,
	setIsValidPresupuesto,
}) => {
	const [mensaje, setMensaje] = useState('');

	const handlePresupuesto = e => {
		e.preventDefault();
		if (!presupuesto || presupuesto < 0) {
			setMensaje('No es un presupuesto valido');
			return;
		}
		setMensaje('');
		setIsValidPresupuesto(true);
	};

	return (
		<div className='contenedor-presupuesto contenedor sombra'>
			<form className='formulario' onSubmit={handlePresupuesto}>
				<div className='campo'>
					<label htmlFor=''>Definir Presupuesto</label>
					{/* La segunda opcion es pasar el type a number */}
					<input
						type='text'
						className='nuevo-presupuesto'
						placeholder='Añade tu Presupuesto'
						value={presupuesto}
						onChange={e =>
							Number(e.target.value) > 0
								? setPresupuesto(Number(e.target.value))
								: setPresupuesto(0)
						}
					/>
				</div>
				<input type='submit' value='Añadir' />
				{mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
			</form>
		</div>
	);
};
export default NuevoPresupuesto;
