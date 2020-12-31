This repo illustrates the pitfall with `react-query`.

Type into the input field, which tries to sync up with the fake backend.

Now try optimistic updates open `index.tsx` and replace

```ts
const { mutate } = useMutation(fakePost, {
  onSuccess() {
    queryClient.invalidateQueries('foo')
  }
})
```
with

```ts
const { mutate } = useMutation(fakePost, {
  onSuccess() {
    queryClient.invalidateQueries('foo')
  },
  async onMutate(data) {
    await queryClient.cancelQueries('foo')
    queryClient.setQueryData('foo', data)
  }
})
```

We are not even dealing with errors (our fake server doesn't return any errors),
but the experience is still... weird.