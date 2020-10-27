export class PageConfig {
	public defaults: any = {
		dashboard: {
			page: {
				title: 'Dashboard',
				desc: 'Latest updates and statistic charts'
			},
		},
		'user-management': {
			users: {
				page: { title: 'Users', desc: '' }
			},
			roles: {
				page: { title: 'Roles', desc: '' }
			}
		},
		'form-management':{
			'metabolic-disorder': { // <= add page URL
				page: { title: 'Metabolic Disorder', desc: 'description of metabolic disorder' } // <= Page name and description
			},
			'substance-dependence': {
				page: { title: 'Substance Dependence', desc: 'description of substance dependence' }
			},
			'vitamin-d': {
				page: { title: 'Vitamin-D', desc: 'description of vitamin-d' }
			},
			'new-form': {
				page: { title: 'Emirates Family Registry', desc: 'description of Emirates Family Registry' }
			},
			'hsa': {
				page: { title: 'Precision Medicine', desc: 'description of precision medicine' }
			},
			'covid19': {
				page: { title: 'Covid-19', desc: 'description of Covid-19' }
			},
			'reporting-tool': {
				page: { title: 'Reporting Tool',  },
			},
			'osteoporosis': {
				page: { title: 'osteoporosis', desc: 'description of vitamin-d' }
			},'k1000-arab-genone': {
				page: { title: '1000 Arab genone', desc: 'description 1000 Arab genone' }
			},
		},
		header: {
			actions: {
				page: { title: 'Actions', desc: 'Actions example page' }
			}
		},
		profile: {
			page: { title: 'User Profile', desc: '' }
		},
		'my-page': {
			page: { title: 'My Page', desc: 'description of my page for testing!' }
		},
		error: {
			404: {
				page: { title: '404 Not Found', desc: '', subheader: false }
			},
			403: {
				page: { title: '403 Access Forbidden', desc: '', subheader: false }
			}
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
