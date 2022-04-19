import React from 'react';
import { secondsToMinutes } from '../../utils/secondsToMinutes';

export function Timer({ mainTime }: { mainTime: number }): JSX.Element {
	return <div className="timer">{secondsToMinutes(mainTime)}</div>;
}
