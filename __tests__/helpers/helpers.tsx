import { JSX } from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';

export const renderAndWaitEffects: (Component: JSX.Element) => Promise<ReactTestRenderer> = async (Component) => {
  let rendered: ReactTestRenderer;

  await act(async () => {
    rendered = create(Component);
  });

  return rendered!;
};
