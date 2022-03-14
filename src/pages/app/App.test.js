import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';

const response = { speaker: 'Speaker', quote: 'test quote' }

const server = setupServer(
  rest.get('http://127.0.0.1:5000/', (req, res, ctx) => {
    return res(ctx.json(response));
  })
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('renders the app with a button, a quote and a button', () => {
  render(<App />)

  const buttonEl = screen.getByRole('button')
  const imageEl = screen.getByRole('img')
  const textEl = screen.getByText(/loading speaker/)

  expect(buttonEl).toBeInTheDocument()
  expect(imageEl).toBeInTheDocument()
  expect(textEl).toBeInTheDocument()

});


test('calls api on button click and update its text', async () => {
  const customResponse = {
    speaker: 'custom test speaker',
    quote: 'teste quote'
  };

  render(<App />);

  server.use(
    rest.get(process.env.REACT_APP_API, (req, res, ctx) => {
      return res(ctx.json(customResponse));
    })
  );

  const buttonEl = screen.getByRole('button');

  fireEvent.click(buttonEl);
  const quoteEl = await screen.findByText(/custom test speaker/i);

  expect(quoteEl).toBeInTheDocument();
});