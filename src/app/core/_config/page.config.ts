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

			'new-form': {
				page: { title: 'Sample Collection', desc: 'description of sample collection' }
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
