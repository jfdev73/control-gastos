import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ gastos, setPresupuesto, presupuesto }) => {
	// const formatearCantidad = cantidad => {
	// 	return cantidad.toLocaleString('en-US', {
	// 		style: 'currency',
	// 		currency: 'USD',
	// 	});
	// };
	const [porcentaje, setPorcentaje] = useState(0);
	const [disponible, setDisponible] = useState(0);
	const [gastado, setGastado] = useState(0);

	useEffect(() => {
		const totalGastado = gastos.reduce(
			(total, gasto) => gasto.cantidad + total,
			0
		);

		const totalDisponible = presupuesto - totalGastado;
		//calculo porcentaje gastado
		const nuevoPorcentaje = (
			((presupuesto - totalDisponible) / presupuesto) *
			100
		).toFixed(2);

		setPorcentaje(nuevoPorcentaje);
		setDisponible(totalDisponible);
		setGastado(totalGastado);
	}, [gastos]);

	const formatearCantidad = cantidad => {
		return cantidad.toLocaleString('es-MX', {
			style: 'currency',
			currency: 'MXN',
		});
	};

	const handleReset = () => {
		const confirmacion = window.confirm(
			'¿Estas seguro de querer reiniciar la aplicación?'
		);
		if (confirmacion) {
			localStorage.clear();
			window.location.reload();
		}
	};

	return (
		<div className='contenedor-presupuesto contenedor sombra dos-columnas'>
			<div>
				<CircularProgressbar
					value={porcentaje}
					text={`${porcentaje} % Gastado`}
					styles={buildStyles({
						// How long animation takes to go from one percentage to another, in seconds
						pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
						trailColor: '#F5F5F5',
						pathTransitionDuration: 4.5,
						textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
					})}
				/>
			</div>
			<div className='contenido-presupuesto'>
				<button className='reset-app' type='button' onClick={handleReset}>
					Resetear
				</button>
				<p>
					<span>Presupuesto:</span> {formatearCantidad(presupuesto)}
				</p>
				<p className={`${disponible < 0 ? 'negativo' : 0} `}>
					<span>Disponible:</span> {formatearCantidad(disponible)}
				</p>
				<p>
					<span>Gastado:</span> {formatearCantidad(gastado)}
				</p>
			</div>
		</div>
	);
};
export default ControlPresupuesto;
