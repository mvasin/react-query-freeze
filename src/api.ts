let serverState = ''

function getDelay() {
  const delayMs = Math.random() * 5000
  return {
    delayMs,
    delaySec: `${Math.round(delayMs / 100) / 10}s`
  }
}

/** GETs a value from a server with a random delay */
export function fakeGet() {
  const { delayMs, delaySec } = getDelay()
  const message = `GETting ${serverState} from the server with a delay of ${delaySec}`
  console.log(`started ${message}`)
  return new Promise<string>((res) => {
    setTimeout(() => {
      console.log(`finished ${message}`)
      res(serverState)
    }, delayMs)
  })
}

/** POSTs a value to a server with a random delay */
export function fakePost(value: string) {
  const { delayMs, delaySec } = getDelay()
  const message = `POSTing ${value} to the server (this will overwrite ${serverState} on the server) with a delay of ${delaySec}`
  console.log(`started ${message}`)
  return new Promise<string>((res) => {
    setTimeout(() => {
      console.log(`finished ${message}`)
      serverState = value
      res(serverState)
    }, delayMs)
  })
}