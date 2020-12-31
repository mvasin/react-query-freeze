import ReactDOM from 'react-dom'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery
} from 'react-query'
import './index.css'

const queryClient = new QueryClient()

/**
 * This whole app is about posting a single string value to the server.
 */
function App() {
  const { data } = useQuery('foo', fakeGet)
  const { mutate } = useMutation(fakePost, {
    onSuccess() {
      queryClient.invalidateQueries('foo')
    }
  })

  return (
    <>
      <label>
        Type in something:{' '}
        <input
          value={data ?? ''}
          onChange={(event) => mutate(event.target.value)}
        ></input>
        <div><small>We persist automatically to the server as you type</small></div>
      </label>
    </>
  )
}

let serverState = ''

/** GETs a value from a server with a random delay */
function fakeGet() {
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
function fakePost(value: string) {
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

function getDelay() {
  const delayMs = Math.random() * 5000
  return {
    delayMs,
    delaySec: `${Math.round(delayMs / 100) / 10}s`
  }
}

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
)
