import { useEffect, useState } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconNuevoGasto from './img/nuevo-gasto.svg';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';

function App() {
	const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
	// const gastosLS = localStorage.getItem('gastos')
	// 	? JSON.parse(localStorage.getItem('gastos'))
	// 	: [];
	const gastosLS = JSON.parse(localStorage.getItem('gastos')) ?? [];

	const [presupuesto, setPresupuesto] = useState(presupuestoLS);

	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

	const [modal, setModal] = useState(false);
	const [animarModal, setAnimarModal] = useState(false);
	const [gastos, setGastos] = useState([...gastosLS]);

	const [gastoEditar, setGastoEditar] = useState({});

	const [filtro, setFiltro] = useState('');
	const [gastosFiltrados, setGastosFiltrados] = useState([]);

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			handleNuevoGasto();
		}
	}, [gastoEditar]);

	useEffect(() => {
		localStorage.setItem('presupuesto', presupuesto ?? 0);
	}, [presupuesto]);

	useEffect(() => {
		localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
	}, [gastos]);

	useEffect(() => {
		if (filtro) {
			const gastosFiltrados = gastos.filter(
				gasto => gasto.categoria === filtro
			);
			setGastosFiltrados(gastosFiltrados);
		}
	}, [filtro]);

	useEffect(() => {
		if (presupuestoLS > 0) {
			setIsValidPresupuesto(true);
		}
	}, []);

	const saveGasto = gasto => {
		if (gasto.id) {
			const gastosActualizados = gastos.map(gastoState =>
				gastoState.id === gasto.id ? gasto : gastoState
			);
			setGastos(gastosActualizados);
			return;
		}
		gasto.id = generarId();
		gasto.fecha = Date.now();
		setGastos([...gastos, gasto]);

		// setAnimarModal(false);
		// setTimeout(() => {
		// 	setModal(false);
		// }, 500);
	};

	const handleNuevoGasto = () => {
		setModal(true);
		setTimeout(() => {
			setAnimarModal(true);
		}, 600);
	};

	const eliminarGasto = id => {
		const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
		setGastos(gastosActualizados);
	};

	return (
		<div className={modal ? 'fijar' : ''}>
			<Header
				gastos={gastos}
				setGastos={setGastos}
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
			/>
			{isValidPresupuesto && (
				<>
					<main>
						<Filtros filtro={filtro} setFiltro={setFiltro} />
						<ListadoGastos
							gastos={gastos}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
							filtro={filtro}
							gastosFiltrados={gastosFiltrados}
						/>
					</main>
					<div className='nuevo-gasto'>
						<img
							src={IconNuevoGasto}
							alt='icono nuevo gasto'
							onClick={handleNuevoGasto}
						/>
					</div>
				</>
			)}

			{modal && (
				<Modal
					setModal={setModal}
					animarModal={animarModal}
					setAnimarModal={setAnimarModal}
					saveGasto={saveGasto}
					gastoEditar={gastoEditar}
					setGastoEditar={setGastoEditar}
				/>
			)}
		</div>
	);
}

export default App;
