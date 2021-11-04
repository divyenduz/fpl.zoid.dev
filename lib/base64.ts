import base64 from 'base-64'

export function encodeHash(state: Record<any, any>) {
	return base64.encode(JSON.stringify(state))
}

export function decodeHash(hash: string) {
	const jsonStr = base64.decode(hash)
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