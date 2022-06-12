const ctx = document.getElementById('myChart').getContext('2d');

Chart.defaults.font.size = 15;
Chart.defaults.font.family = 'DM Sans, sans-serif';
Chart.defaults.color = '#92857A';

fetch('./data.json')
	.then(response => response.json())
	.then(data => {
		let days = data.map(item => item.day);
		let amounts = data.map(item => item.amount);

		let maxAmount = Math.max(...amounts);
		let backgroundColors = amounts.map(amount => {
			if (amount === maxAmount) {
				return '#B4E0E5';
			} else {
				return '#EC755D';
			}
		});

		const myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: days,
				datasets: [
					{
						data: amounts,
						backgroundColor: backgroundColors,
						borderWidth: 0,
						borderRadius: 5,
						borderSkipped: false,
					},
				],
			},
			options: {
				tooltips: {
					mode: 'dataset',
				},
				onHover: (event, chartElement) => {
					const target = event.native ? event.native.target : event.target;
					target.style.cursor = chartElement[0] ? 'grab' : 'default';
				},
				responsive: true,
				interaction: {
					axis: 'y',
					mode: 'index',
				},
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						callbacks: {
							labelPointStyle: function (context) {
								return {
									pointStyle: 'none',
								};
							},
							title: function (context) {
								return `$${context[0].formattedValue}`;
							},
							label: function (context) {
								return '';
							},
						},
					},
				},
				scales: {
					x: {
						grid: {
							display: false,
						},
					},
					y: {
						display: false,
					},
				},
			},
		});
	})
	.catch(err => {
		console.log(err);
	});
