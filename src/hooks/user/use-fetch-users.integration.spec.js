import { renderHook, act as hooksAct } from '@testing-library/react-hooks';
import Response from 'miragejs';
import { makeServer } from '../../miragejs/server';
import { useFetchUsers } from './use-fetch-users';

describe('UseFetchUsers', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    server.shutdown();
  });
  it('should return a list of 10 users', async () => {
    server.createList('user', 10);
    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());
    await waitForNextUpdate();
    expect(result.current.users).toHaveLength(10);
    expect(result.current.error).toBe(false);
  });
  it('should set error to true when catch() block is executed', async () => {
    server.get('users', () => {
      return new Response(500, {}, '');
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());

    await waitForNextUpdate();

    expect(result.current.error).toBe(true);
    expect(result.current.users).toHaveLength(0);
  });
  it('should delete a user from a list of 10 users', async () => {
    server.createList('user', 10);
    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());
    await waitForNextUpdate();
    expect(result.current.users).toHaveLength(10);
    const removedIndex = 5;
    const removedUser = result.current.users[removedIndex];
    await hooksAct(() => result.current.handleDelete(removedIndex));
    expect(result.current.users).toHaveLength(9);
    expect(result.current.users.indexOf(removedUser)).toBe(-1);
  });
  it('should set error to true when delete request fail', async () => {
    server.createList('user', 10);
    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());
    await waitForNextUpdate();
    expect(result.current.users).toHaveLength(10);
    await hooksAct(() => result.current.handleDelete(15));
    expect(result.current.users).toHaveLength(10);
    expect(result.current.error).toBe(true);
  });
});
