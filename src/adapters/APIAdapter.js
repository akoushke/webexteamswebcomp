import api from '../data/api';

export default class APIAdapter {
	constructor(mount) {
		this.mount = mount;
	}

	async getPerson(id) {
		const person = await api.getPerson(id);
		this.mount(
			{...person, 
			 src: person.avatar,
			 status: person.status === 'DoNotDisturb' ? 'dnd' : person.status});
	}
}



