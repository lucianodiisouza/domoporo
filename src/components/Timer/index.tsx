import React from 'react';
import { secondsToMinutes } from '../../utils/secondsToMinutes';

interface Props {
	mainTime: number;
}

export function Timer(props: Props): JSX.Element {
	return <div className="timer">{secondsToMinutes(props.mainTime)}</div>;
}
