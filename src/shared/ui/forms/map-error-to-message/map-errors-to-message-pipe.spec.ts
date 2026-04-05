import { MapErrorsToMessagePipe } from './map-errors-to-message-pipe';

describe('MapErrorToMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new MapErrorsToMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
