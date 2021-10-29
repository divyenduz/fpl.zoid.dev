export function encodeHash(state: Record<any, any>) {
	return Buffer.from(JSON.stringify(state)).toString('base64')
}

export function decodeHash(hash: string) {
	return JSON.parse(Buffer.from(hash, 'base64').toString())
}