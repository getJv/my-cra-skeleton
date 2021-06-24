import { renderHook, act as hooksAct } from '@testing-library/react-hooks';
import { makeServer } from '../../miragejs/server';
import { useSaveUsers } from './use-save-users';
import { useFetchUsers } from './use-fetch-users';

/* Mocking the useHistory Hook */
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
/* Mocking the HTML event object */
const event = {
  preventDefault: jest.fn(),
};

describe('UseSaveUsers', () => {
  let server;
  let saveResult;
  let saveWaitForNextUpdate;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    const saveHook = renderHook(() => useSaveUsers());
    saveResult = saveHook.result;
    saveWaitForNextUpdate = saveHook.waitForNextUpdate;
  });
  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });
  it('should handleSubmit register a user', async () => {
    // server.create('user');
    hooksAct(() => {
      saveResult.current.setFormData({
        name: 'name',
        value: 'Johnnie Heathcote',
      });
    });

    hooksAct(() => {
      saveResult.current.handleSubmit(event);
    });
    await saveWaitForNextUpdate();
    expect(saveResult.current.error).toBe(false);

    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());
    await waitForNextUpdate();

    expect(result.current.users.length).toBe(1);
    expect(result.current.users[0].name).toBe('Johnnie Heathcote');
  });
  it('should handleSubmit update a user', async () => {
    server.create('user', { id: 1, allow_email: true, name: 'Icaro' });
    hooksAct(() => {
      saveResult.current.setFormData({ id: 1, allow_email: true, name: 'Mario' });
    });

    hooksAct(() => {
      saveResult.current.handleSubmit(event);
    });
    await saveWaitForNextUpdate();
    expect(saveResult.current.error).toBe(false);

    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());
    await waitForNextUpdate();
    expect(result.current.users.length).toBe(1);
    expect(result.current.users[0].name).toBe('Mario');
  });
  it('should set error when the request fail', async () => {
    server.create('user', { id: 1, allow_email: true, name: 'Icaro' });
    hooksAct(() => {
      saveResult.current.setFormData({ id: 999, allow_email: true, name: 'Mario' });
    });

    hooksAct(() => {
      saveResult.current.handleSubmit(event);
    });
    await saveWaitForNextUpdate();
    expect(saveResult.current.error).toBe(true);
  });
  it('should call history.push after register a user', async () => {
    saveResult.current.formData = { allow_email: true, name: 'Icaro' };
    hooksAct(() => {
      saveResult.current.handleSubmit(event);
    });
    await saveWaitForNextUpdate();

    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith({ pathname: '/users' });
  });
  it('should handleChange convert eventEntry checkbox into formData', () => {
    const eventCheckbox = {
      target: {
        name: 'allow_email',
        type: 'checkbox',
        checked: true,
      },
    };
    hooksAct(() => {
      saveResult.current.handleChange(eventCheckbox);
    });
    expect(saveResult.current.formData).toEqual({ allow_email: true });
  });
  it('should handleChange convert eventEntry into formData', () => {
    const eventText = {
      target: {
        name: 'name',
        type: 'textbox',
        value: 'Icaro',
      },
    };
    hooksAct(() => {
      saveResult.current.handleChange(eventText);
    });
    expect(saveResult.current.formData).toEqual({ name: 'Icaro' });
  });
  it('should handleCancel calls historyBack once', () => {
    hooksAct(() => {
      saveResult.current.handleCancel();
    });

    expect(mockHistoryPush).toBeCalledTimes(1);
  });
});
