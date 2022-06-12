fetch('./data.json')
	.then(response => response.json())
	.then(data => {
		let amounts = data.map(item => item.amount);
		let scale = d3
			.scaleLinear()
			.domain([0, Math.max(...amounts)])
			.range([0, 120]);
		console.log(amounts);

		let bars = document.querySelectorAll('.day-bar');
		bars.forEach((bar, index) => (bar.style.height = `${scale(amounts[index])}px`));

		tippy('.day-bar', {
			content(reference) {
				console.log(reference);
				return `$${scale.invert(reference.style.height.substr(0, reference.style.height.length - 2)).toFixed(2)}`;
			},
		});

		console.log(amounts.reduce((p, c) => p + c));
	})
	.catch(error => {
		console.log(error);
	});
