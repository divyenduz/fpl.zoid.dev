export function encodeHash(state: Record<any, any>) {
	return Buffer.from(JSON.stringify(state)).toString('base64')
}

export function decodeHash(hash: string) {
	const jsonStr = Buffer.from(hash, 'base64').toString()
	try {
		return {
			...JSON.parse(jsonStr),
			status: 'OK',
		}
	} catch (e) {
		console.log(jsonStr)
		return {
			text: '',
			queryDraft: '',
			status: 'PARSE_FAIL',
		}
	}
}