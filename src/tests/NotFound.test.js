import { screen, render } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('testa o componente Not found', () => {
  it('Teste se página contém um heading h2 com o texto "Page requested not found 😭"',
    () => {
      render(<NotFound />);

      const notFoundHeading = screen.getByRole('heading', {
        name: 'Page requested not found Crying emoji',
        level: 2,
      });

      expect(notFoundHeading).toBeInTheDocument();
    });
  it('testa se a pagina mostra a imagem especificada', () => {
    render(<NotFound />);

    const notFoundImageAlt = 'Pikachu crying because the page requested was not found';
    const notFoundImageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImage = screen.getByAltText(notFoundImageAlt);

    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage).toHaveAttribute('src', notFoundImageUrl);
  });
});
