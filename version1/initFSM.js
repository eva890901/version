function initFSM () {

	let fsm = new StateMachine({
		init: 'idle',
		transitions: [
			{ name: 'approach', from: 'idle', to: 'flee' },
			{ name: 'depart',   from: 'flee', to: 'idle'},
			{ name: 'halt',     from: 'flee', to: 'stop'},
			{ name: 'saved',    from: 'stop', to: 'idle'},
			{ name: 'saving',    from: 'save', to: 'idle'},
			{ name: 'mission',    from: 'idle', to: 'save'},
			{ name: 'danger',    from: 'save', to: 'flee'},

		]
	});
  
	return fsm; 
}