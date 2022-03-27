import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('testa o componente About', () => {
  it('testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const title = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });

    expect(title).toBeInTheDocument();
  });
  it('testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const paragraphsContent = {
      first:
  'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons',
      second:
  'One can filter Pokémons by type, and see more details for each one of them',
    };

    const firstParagraph = screen.getByText(paragraphsContent.first);
    const secondParagraph = screen.getByText(paragraphsContent.second);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('testa se a pagina contem imagem  de Pokedex', () => {
    render(<About />);

    const pokedexImage = screen.getByAltText('Pokédex');

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
