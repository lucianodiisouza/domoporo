import React, { useState } from 'react';
import { useInterval } from '../../hooks/useInterval';

interface Props {
	defaultPomodoroTime: number;
}

export default function PomodoroTimer(props: Props): JSX.Element {
	const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);

	useInterval(() => {
		setMainTime(mainTime - 1);
	}, 1000);

	return <div>DomoPoro Time: {mainTime} </div>;
}
