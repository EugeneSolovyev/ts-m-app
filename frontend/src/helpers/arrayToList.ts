class List<T> {
	constructor(private value: T, private next: T | null = null) {}
}

export const convertArrayToList = <T, R>(array: Array<R>): List<T> => {
	let node: any;
	let temp: any;

	for (let i = array.length - 1; i >= 0; i--) {
		if (!node) {
            node = new List(array[i]);
        } else {
            temp = new List(array[i]);
            temp.next = node;
            node = temp;
        }
	}



	return node;
};
