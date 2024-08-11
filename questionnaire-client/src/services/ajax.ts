
const HOST = 'http://localhost:3001' // Mock server

export async function get(url: string) {
    const res = await fetch(`${HOST}${url}`)
    const data = res.json()
    return data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post(url: string, body: any) {
    const res = await fetch(`${HOST}${url}`, {
        method: 'POST',
        body: JSON.stringify(body),
    })
    const data = res.json()
    return data
}