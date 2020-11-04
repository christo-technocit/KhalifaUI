export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: []
		},
		aside: {
			self: {},
			items: JSON.parse(localStorage.getItem('menus'))
// 			[
// 				{
// 					title: 'Dashboard',
// 					root: true,
// 					icon: 'flaticon2-architecture-and-city',
// 					page: '/dashboard',
// 					translate: 'DASHBOARD',
// 					bullet: 'dot',
// 				},
// 				{ section: 'Form Management' },
// 				{
// 					title: 'Metabolic Disorder',
// 					root: true,
// 					icon: 'flaticon2-list-2',
// 					page: '/form-management/metabolic-disorder',
// 					translate: 'Metabolic Disorder',
// 					bullet: 'dot',
// 				},
// 				{
// 					title: 'Substance Dependence',
// 					root: true,
// 					icon: 'flaticon2-list-2',
// 					page: '/form-management/substance-dependence',
// 					translate: 'Substance Dependence',
// 					bullet: 'dot',
// 				},
// 				{
// 					title: 'Vitamin-D',
// 					root: true,
// 					icon: 'flaticon2-list-2',
// 					page: '/form-management/vitamin-d',
// 					translate: 'Vitamin-D',
// 					bullet: 'dot',
// 				},{
// 					title: '1000 Arab Genome',
// 					root: true,
// 					icon: 'flaticon2-list-2',
// 					page: '/form-management/1000-arab-genome',
// 					translate: '1000 Arab Genome',
// 					bullet: 'dot',
// 				},{
// 					title: 'Obesity',
// 					root: true,
// 					icon: 'flaticon2-list-2',
// 					page: '/form-management/obesity',
// 					translate: 'Obesity',
// 					bullet: 'dot',
// 				},{
// 					title: 'Osteoporosis',
// 					root: true,
// 					icon: 'flaticon2-list-2',
// 					page: '/form-management/osteoporosis',
// 					translate: 'Osteoporosis',
// 					bullet: 'dot',
// 				},{
// 					title: 'T1D Forms',
// 					root: true,
// 					icon: 'flaticon2-list-2',
// 					page: '/form-management/t1d',
// 					translate: 'T1D',
// 					bullet: 'dot',
// 				},{
// 					title: 'Emirates Family Registry',
// 					root: true,
// 					icon: 'flaticon2-list-2',
// 					page: '/form-management/new-form',
// 					translate: 'Emirates  Family Registry',

// 					bullet: 'dot',
// 				},{
// 					title: 'Precision Medicine',
// 					root: true,
// 					icon: 'flaticon2-list-2',
// 					page: '/form-management/hsa',
// 					translate: 'Precision Medicine',

// 					bullet: 'dot',
// 				},{
// 					title: 'Covid-19',
// 					root: true,
// 					icon: 'flaticon2-list-2',
// 					page: '/form-management/covid19',
// 					translate: 'Covid-19',

// 					bullet: 'dot',
// 				},
// 				{ section: 'Reporting' },
// 				{
// 					title: 'Reports',
// 					root: true,
// 					icon: 'flaticon2-browser-2',
// 					page: '/form-management/reporting-tool',
// 					translate: 'Reports',
// 					bullet: 'dot',
// 				},

// //				{ section: 'Administration' },
// //				{
// //					title: 'User Management',
// //					root: true,
// //					icon: 'flaticon2-user-outline-symbol',
// //					page: '#',
// //					translate: 'User Management',
// //					bullet: 'dot',
// //				},

// 			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
