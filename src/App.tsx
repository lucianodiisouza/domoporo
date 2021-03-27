import React from 'react';
import { PomodoroTimer } from './components';

function App(): JSX.Element {
	return (
		<div className="App">
			<PomodoroTimer defaultPomodoroTime={300} />
		</div>
	);
}

export default App;
