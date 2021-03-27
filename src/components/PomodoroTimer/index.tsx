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
	const [resting, setResting] = useState(false);

	useInterval(
		() => {
			setMainTime(mainTime - 1);
		},
		timeCounting ? 1000 : null,
	);

	function handleWorking() {
		setTimeCounting(true);
		setWorking(true);
		setResting(true);
		setMainTime(props.pomodoroTime);
	}

	function handleResting(long: boolean) {
		setTimeCounting(true);
		setWorking(false);
		setResting(true);

		if (long) {
			setMainTime(props.longRestTime);
		} else {
			setMainTime(props.shortRestTime);
		}
	}

	useEffect(() => {
		if (working) document.body.classList.add('working');
		if (resting) document.body.classList.remove('working');
	}, [working]);

	return (
		<div className="pomodoro">
			<h2>Voce está: Trabalhando</h2>
			<Timer mainTime={mainTime} />
			<div className="controls">
				<Button text="Work" onClick={() => handleWorking()}></Button>
				<Button text="Rest" onClick={() => handleResting(false)}></Button>
				<Button
					className={!working && !resting ? 'hidden' : ''}
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
