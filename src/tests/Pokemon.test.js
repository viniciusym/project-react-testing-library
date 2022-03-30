import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { isPokemonFavoriteByIdType } from '../types';

describe('testa o componente Pokemon', () => {
  it('testa se é renderizado um card com as informações de determinado pokémon', () => {
    const pokemonTest = pokemons[0];
    const { history } = renderWithRouter(<App />);

    const pokemonName = screen.getByText(pokemonTest.name);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe(pokemonTest.type);

    const expectedWeightValue = pokemonTest.averageWeight.value;
    const expectedWeightUnit = pokemonTest.averageWeight.measurementUnit;
    const expectedAvarageWeight = (
      `Average weight: ${expectedWeightValue} ${expectedWeightUnit}`
    );
    const averageWeight = screen.getByTestId('pokemon-weight');
    expect(averageWeight.innerHTML).toBe(expectedAvarageWeight);

    const expectedImgSrc = pokemonTest.image;
    const expectedAltText = `${pokemonTest.name} sprite`;
    const pokemonImage = screen.getByAltText(expectedAltText);
    expect(pokemonImage).toHaveAttribute('src', expectedImgSrc);
    expect(pokemonImage).toHaveAttribute('alt', expectedAltText);

    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    const expectPathname = '/pokemons/25';
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(expectPathname);

    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteButton);

    const expectedFavoritedImgSrc = '/star-icon.svg';
    const expectedFavoritedAltText = `${pokemonTest.name} is marked as favorite`;
    const favoriteImg = screen.getByAltText(expectedFavoritedAltText);
    expect(favoriteImg).toHaveAttribute('src', expectedFavoritedImgSrc);
    expect(favoriteImg).toHaveAttribute('alt', expectedFavoritedAltText);
  });
});
