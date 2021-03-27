import React, { useState, useEffect, useCallback } from 'react';
import { useInterval } from '../../hooks/useInterval';
import { secondsToTime } from '../../utils/secondsToTime';
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
	const [cyclesQtdManager, setCyclesQtdManager] = useState(
		new Array(props.cycles - 1).fill(true),
	);

	const [completedCycles, setCompletedCycles] = useState(0);
	const [fullWorkingTime, setFullWorkingTime] = useState(0);
	const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

	useInterval(
		() => {
			setMainTime(mainTime - 1);
			if (working) setFullWorkingTime(fullWorkingTime + 1);
		},
		timeCounting ? 1000 : null,
	);

	const handleWorking = useCallback(() => {
		setTimeCounting(true);
		setWorking(true);
		setResting(true);
		setMainTime(props.pomodoroTime);
	}, [
		setTimeCounting,
		setWorking,
		setResting,
		setMainTime,
		props.pomodoroTime,
	]);

	const handleResting = useCallback(
		(long: boolean) => {
			setTimeCounting(true);
			setWorking(false);
			setResting(true);

			if (long) {
				setMainTime(props.longRestTime);
			} else {
				setMainTime(props.shortRestTime);
			}
		},
		[
			setTimeCounting,
			setWorking,
			setResting,
			setMainTime,
			props.longRestTime,
			props.shortRestTime,
		],
	);

	useEffect(() => {
		if (working) document.body.classList.add('working');
		if (resting) document.body.classList.remove('working');

		if (mainTime > 0) return;

		if (working && cyclesQtdManager.length > 0) {
			handleResting(false);
			cyclesQtdManager.pop();
		} else if (working && cyclesQtdManager.length <= 0) {
			handleResting(true);
			setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
			setCompletedCycles(completedCycles + 1);
		}

		if (working) {
			setNumberOfPomodoros(numberOfPomodoros + 1);
		}

		if (resting) {
			handleWorking();
		}
	}, [
		working,
		resting,
		mainTime,
		handleResting,
		handleWorking,
		cyclesQtdManager,
		numberOfPomodoros,
		setCyclesQtdManager,
		props.cycles,
		completedCycles,
	]);

	return (
		<div className="pomodoro">
			<h2>Voce está: {working ? 'Trabalhando' : 'Descansando'}</h2>
			<Timer mainTime={mainTime} />
			<div className="controls">
				<Button text="Trabalhar" onClick={() => handleWorking()}></Button>
				<Button text="Descansar" onClick={() => handleResting(false)}></Button>
				<Button
					className={!working && !resting ? 'hidden' : ''}
					text={timeCounting ? 'Pausar' : 'Iniciar'}
					onClick={() => setTimeCounting(!timeCounting)}
				></Button>
			</div>
			<div className="details">
				<p>Ciclos concluídos: {completedCycles}</p>
				<p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
				<p>Número de pomodoros concluídos: {numberOfPomodoros}</p>
			</div>
		</div>
	);
}
