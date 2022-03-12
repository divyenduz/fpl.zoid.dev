import base64 from 'base-64'

export function encodeHash(state: Record<any, any>) {
  return base64.encode(JSON.stringify(state))
}

export function decodeHash(hash: string) {
  type Response = Record<'text' | 'queryDraft', string>
  const jsonStr = base64.decode(hash)
  const jsonVal: Response = JSON.parse(jsonStr)
  try {
    return {
      ...jsonVal,
      status: 'OK' as const,
    }
  } catch (e) {
    console.log({ e, jsonStr })
    return {
      text: '',
      queryDraft: '',
      status: 'PARSE_FAIL' as const,
    }
  }
}
