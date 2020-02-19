import { pipe } from 'ramda';

export const decamelize = (str: string): string => {
	return str
		.replace(/([a-z\d])([A-Z])/g, '$1 $2')
		.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2')
		.toLowerCase();
};

export const capitalize = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const normalize = pipe(decamelize, capitalize);
