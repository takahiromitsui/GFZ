export const areObjectsEqual = (objA: any, objB: any) => {
	const keysA = Object.keys(objA);
	const keysB = Object.keys(objB);

	if (keysA.length !== keysB.length) {
		return false;
	}

	for (const key of keysA) {
		if (objA[key] !== objB[key]) {
			return false;
		}
	}

	return true;
};
