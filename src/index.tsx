import ReactDOM from 'react-dom'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery
} from 'react-query'

import { fakeGet, fakePost } from './api'

import './index.css'

const queryClient = new QueryClient()

function App() {
  const { data } = useQuery('foo', fakeGet)
  const { mutate } = useMutation(fakePost, {
    onSuccess() {
      queryClient.invalidateQueries('foo')
    }
  })

  return (
    <>
      <div>This app is about posting a single string value to the server.</div>
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

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
)
