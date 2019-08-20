//Customer
Highcharts.chart('customer', {
				chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
				},
				title: {
				text: 'Customer'
				},
				tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
				pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
				enabled: true,
				format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				style: {
				color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
				}
				}
				}
				},
				series: [{
				name: 'Project',
				colorByPoint: true,
				data: [{
				name: 'Customer B',
				y: 61.41,
				sliced: true,
				selected: true
				},{
				name: 'Customer A',
				y: 2.61
				}]
				}]
				});

Highcharts.chart('employee', {

    title: {
        text: 'Employee'
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data: [
            ['Employee A', 29.9, false],
            ['Employee B', 71.5, false],
            ['Employee C', 106.4, false],
            ['Employee D', 148.5, false]
        ],
        showInLegend: true
    }]
});

//Billable

Highcharts.chart('billabe', {
				chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
				},
				title: {
				text: 'Billabe'
				},
				tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
				pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
				enabled: true,
				format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				style: {
				color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
				}
				}
				}
				},
				series: [{
				name: 'Project',
				colorByPoint: true,
				data: [{
				name: 'Billabe',
				y: 5.61
				}]
				}]
				});


//Task


Highcharts.chart('task', {

    title: {
        text: 'Task'
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data: [
            ['Task A', 29.9, false],
            ['Task B', 71.5, false],
            ['Task C', 106.4, false],
            ['Task D', 148.5, false]
        ],
        showInLegend: true
    }]
});