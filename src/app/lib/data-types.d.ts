export interface BookData {
	id: number;
	name: string;
	summary: string;
	isbn_10: string;
	isbn_13: string;
	page_count: number;
	release_date: string;
	series_type: SeriesTypeData;
	publisher: PublisherData;
	language: LanguageData;
	binding: BindingData;
	deleted_at: string;
}

export interface PublisherData {
	id: number;
	name: string;
	url: string;
	about: string;
	logo: MediaData;
	deleted_at: string;
}

export interface BindingData {
	id: number;
	name: string;
	delete_at: string;
}

export interface SeriesTypeData {
	id: number;
	series: SeriesData;
	type: ItemTypeData;
	status: StatusData;
	staff: StaffData[];
	deleted_at: string;
}

export interface SeriesData {
	id: number;
	names: SeriesNameData[];
	cover: MediaData;
	delete_at: string;
}

export interface SeriesNameData {
	value: string;
	language: LanguageData;
	delete_at: string;
}

export interface LanguageData {
	id: number;
	name: string;
	iso_639_1: string;
	delete_at: string;
}

export interface MediaData {
	url: string;
	meta: string;
}

export interface ItemTypeData {
	id: number;
	name: string;
	delete_at: string;
}

export interface StatusData {
	id: number;
	name: string;
	delete_at: string;
}

export interface StaffData {
	id: number;
	name: string;
	native_name: string;
	description: string;
	age: number;
	gender: string;
	origin: string;
	started_on: string;
	stopped_on: string;
	picture: MediaData;
	deleted_at: string;
}