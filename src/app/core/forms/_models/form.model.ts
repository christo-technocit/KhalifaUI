import { BaseModel } from '../../_base/crud';

export class EForm extends BaseModel {
	// Participent Details
	id: number;
	formId: number;
	sampleId: string;
	profilePicture: string;
	dateOfAssessment: string;
	collectedBy: string;
	collectionPoint: string;

	firstName: string;
	middleName: string;
	familyName: string;
	dateOfBirth: string;
	nationality: string;
	ethnicity: string;
	sex: string;
	maritalStatus: string;
	consanguineousMarrage: string;
	numberOfWives: string;
	numberOfChildren: string;
	healthCardNumber: string;
	healthCenter: string;
	placeOfBirth: string;
	address: string;
	suburb: string;
	home: string;
	work: string;
	mobile: string;
	comments: string;
	clear(): void {
		// Participent Details
		this.id = undefined;
		this.formId = undefined;
		this.sampleId = '';
		this.profilePicture = '';
		this.dateOfAssessment = '';
		this.collectedBy = '';
		this.collectionPoint = '';

		this.firstName = '';
		this.middleName = '';
		this.familyName = '';
		this.dateOfBirth = '';
		this.nationality = '';
		this.ethnicity = '';
		this.sex = '';
		this.maritalStatus = '';
		this.consanguineousMarrage = '';
		this.numberOfWives = '';
		this.numberOfChildren = '';
		this.healthCardNumber = '';
		this.healthCenter = '';
		this.placeOfBirth = '';
		this.address = '';
		this.suburb = '';
		this.home = '';
		this.work = '';
		this.mobile = '';
		this.comments = '';
	}
}
