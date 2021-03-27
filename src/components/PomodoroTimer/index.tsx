import React, { useState } from 'react';
import { useInterval } from '../../hooks/useInterval';
import { Button } from '../Button';
import { Timer } from '../Timer';

interface Props {
	defaultPomodoroTime: number;
}

export default function PomodoroTimer(props: Props): JSX.Element {
	const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);

	useInterval(() => {
		setMainTime(mainTime - 1);
	}, 1000);

	return (
		<div className="pomodoro">
			<h2>Voce está: Trabalhando</h2>
			<Timer mainTime={mainTime} />
			<Button text="Clique aqui" onClick={() => alert(1)}></Button>
		</div>
	);
}
