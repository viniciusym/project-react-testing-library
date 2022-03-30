import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const moreDetailsLinkName = 'More details';

describe('testa o componente Pokemon', () => {
  it('testa se é renderizado um card com as informações de determinado pokémon', () => {
    const pokemonTest = pokemons[0];
    renderWithRouter(<App />);

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
  });
  it('Teste o componente contém um link de navegação para exibir detalhes deste Pokémon',
    () => {
      const pokemonTest = pokemons[0];
      renderWithRouter(<App />);

      const moreDetailsLink = screen.getByRole('link', { name: moreDetailsLinkName });
      const expectPathname = `/pokemons/${pokemonTest.id}`;
      expect(moreDetailsLink).toHaveAttribute('href', expectPathname);
      expect(moreDetailsLink).toBeInTheDocument();
    });
  it('testa se ao clicar no link de detalhes é feito o redirecionamento da aplicação',
    () => {
      const pokemonTest = pokemons[0];
      const { history } = renderWithRouter(<App />);

      const moreDetailsLink = screen.getByRole('link', { name: moreDetailsLinkName });
      const expectPathname = `/pokemons/${pokemonTest.id}`;
      expect(moreDetailsLink).toHaveAttribute('href', expectPathname);
      expect(moreDetailsLink).toBeInTheDocument();
      userEvent.click(moreDetailsLink);
      const { pathname } = history.location;
      expect(pathname).toBe(expectPathname);
    });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const pokemonTest = pokemons[0];
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: moreDetailsLinkName });
    const expectPathname = `/pokemons/${pokemonTest.id}`;
    expect(moreDetailsLink).toHaveAttribute('href', expectPathname);
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
