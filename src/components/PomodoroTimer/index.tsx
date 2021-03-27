import React, { useState, useEffect } from 'react';
import { useInterval } from '../../hooks/useInterval';
import { Button } from '../Button';
import { Timer } from '../Timer';

interface Props {
	pomodoroTime: number;
	shortRestTime: number;
	longRestTime: number;
	cycles: number;
}

export default function PomodoroTimer(props: Props): JSX.Element {
	const [mainTime, setMainTime] = useState(props.pomodoroTime);
	const [timeCounting, setTimeCounting] = useState(false);
	const [working, setWorking] = useState(false);

	useInterval(
		() => {
			setMainTime(mainTime - 1);
		},
		timeCounting ? 1000 : null,
	);

	function handleWorking() {
		setTimeCounting(true);
		setWorking(true);
	}

	useEffect(() => {
		if (working) document.body.classList.add('working');
	}, [working]);

	return (
		<div className="pomodoro">
			<h2>Voce está: Trabalhando</h2>
			<Timer mainTime={mainTime} />
			<div className="controls">
				<Button text="Work" onClick={() => handleWorking()}></Button>
				<Button text="Botão" onClick={() => alert(1)}></Button>
				<Button
					text={timeCounting ? 'Pause' : 'Play'}
					onClick={() => setTimeCounting(!timeCounting)}
				></Button>
			</div>
			<div className="details">
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi dicta
					doloremque deleniti maiores veniam atque minus expedita, officia
					fugiat. Blanditiis.
				</p>
			</div>
		</div>
	);
}
