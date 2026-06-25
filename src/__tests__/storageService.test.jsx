import storageService from '../services/storage/storageService'

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn(async (_k) => JSON.stringify({ mocked: true })),
    setItem: vi.fn(async () => null),
    removeItem: vi.fn(async () => null),
  },
}))

test('storageService get/set/remove', async () => {
  await storageService.setItem('k', { a: 1 })
  const v = await storageService.getItem('k')
  expect(v).toEqual({ mocked: true })
  await storageService.removeItem('k')
})
