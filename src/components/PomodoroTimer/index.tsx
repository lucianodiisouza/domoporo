import React, { useState } from 'react';
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

	useInterval(() => {
		setMainTime(mainTime - 1);
	}, 1000);

	return (
		<div className="pomodoro">
			<h2>Voce está: Trabalhando</h2>
			<Timer mainTime={mainTime} />
			<div className="controls">
				<Button text="Botão" onClick={() => alert(1)}></Button>
				<Button text="Botão" onClick={() => alert(1)}></Button>
				<Button text="Botão" onClick={() => alert(1)}></Button>
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
