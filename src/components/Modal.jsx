import { useEffect, useState } from 'react';
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg';

const Modal = ({
	setModal,
	animarModal,
	setAnimarModal,
	saveGasto,
	gastoEditar,
	setGastoEditar,
}) => {
	const [mensaje, setMensaje] = useState('');
	const [nombre, setNombre] = useState('');
	const [cantidad, setCantidad] = useState('');
	const [categoria, setCategoria] = useState('');
	const [fecha, setFecha] = useState('');
	const [id, setId] = useState('');

	const isGastoEditar = Object.keys(gastoEditar).length > 0;
	useEffect(() => {
		if (isGastoEditar) {
			setNombre(gastoEditar.nombre);
			setCantidad(gastoEditar.cantidad);
			setCategoria(gastoEditar.categoria);
			setId(gastoEditar.id);
			setFecha(gastoEditar.fecha);
		}
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		if ([nombre, cantidad, categoria].includes('')) {
			setMensaje('Todos los campos son obligatorios');
			setTimeout(() => setMensaje(''), 3000);
			return;
		}
		saveGasto({ nombre, cantidad, categoria, id, fecha });
		ocultarModal();
	};

	const ocultarModal = () => {
		setAnimarModal(false);
		setGastoEditar({});
		setTimeout(() => {
			setModal(false);
		}, 500);
	};

	return (
		<div className='modal'>
			<div className='cerrar-modal'>
				<img src={CerrarBtn} alt='cerrar modal' onClick={ocultarModal} />
			</div>
			<form
				className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
				onSubmit={handleSubmit}
			>
				<legend>{isGastoEditar ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
				{mensaje && <Mensaje tipo='error'>{mensaje} </Mensaje>}
				<div className='campo'>
					<label htmlFor='nombre'>Nombre Gasto</label>
					<input
						type='text'
						placeholder='Añade el nombre del gasto'
						id='nombre'
						value={nombre}
						onChange={e => setNombre(e.target.value)}
					/>
				</div>
				<div className='campo'>
					<label htmlFor='cantidad'>Cantidad</label>
					<input
						type='number'
						placeholder='Añade la cantidad del gasto'
						id='cantidad'
						value={cantidad}
						onChange={e =>
							setCantidad(e.target.value === '' ? '' : Number(e.target.value))
						}
					/>
				</div>
				<div className='campo'>
					<label htmlFor='categoria'>Categoria</label>
					<select
						name='categoria'
						id='categoria'
						value={categoria}
						onChange={e => setCategoria(e.target.value)}
					>
						<option value=''>--- Seleccione --</option>
						<option value='ahorro'>Ahorro</option>
						<option value='comida'>Comida</option>
						<option value='casa'>casa</option>
						<option value='gastos'>Gastos Varios</option>
						<option value='ocio'>Ocio</option>
						<option value='salud'>Salud</option>
						<option value='suscripciones'>Suscripciones</option>
					</select>
				</div>
				<input
					type='submit'
					value={isGastoEditar ? 'Guardar Cambios' : 'Añadir Gasto'}
				/>
			</form>
		</div>
	);
};
export default Modal;
