import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('testa componente Favorite Pokemons', () => {
  it('testa se quando não tiver favoritos uma mensagem é exibida na tela', () => {
    render(<FavoritePokemons />);

    const notFoundText = screen.getByText('No favorite pokemon found');

    expect(notFoundText).toBeInTheDocument();
  });
  it('testa se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const favoriteButton = screen.getByRole('checkbox');
    userEvent.click(favoriteButton);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const { pathname: favoritePath } = history.location;
    expect(favoritePath).toBe('/favorites');

    const favPokemonimage = screen.getByAltText('Pikachu sprite');
    expect(favPokemonimage).toBeInTheDocument();
    expect(favPokemonimage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
