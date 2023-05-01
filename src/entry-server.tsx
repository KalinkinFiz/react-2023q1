import { RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store';

export const render = (
  url: string | Partial<Location>,
  opts: RenderToPipeableStreamOptions | undefined
) => {
  return renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
    opts
  );
};
