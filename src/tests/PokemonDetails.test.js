import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const moreDetailsLinkName = 'More details';

describe('testa o componente PokemonDetails', () => {
  it('testa se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      const pokemonTest = pokemons[0];
      renderWithRouter(<App />);

      const moreDetailsLink = screen.getByRole('link', { name: moreDetailsLinkName });
      userEvent.click(moreDetailsLink);

      const detailsTitle = screen.getByRole('heading', {
        level: 2,
        name: `${pokemonTest.name} Details`,
      });
      const summaryTitle = screen.getByRole('heading', {
        level: 2,
        name: 'Summary',
      });
      const summaryText = screen.getByText(pokemonTest.summary);

      expect(summaryText).toBeInTheDocument();
      expect(summaryTitle).toBeInTheDocument();
      expect(detailsTitle).toBeInTheDocument();
      expect(moreDetailsLink).not.toBeInTheDocument();
    });
  it('testa se existe na página uma seção com os mapas com as localizações do pokémon',
    () => {
      const pokemonTest = pokemons[0];
      renderWithRouter(<App />);

      const moreDetailsLink = screen.getByRole('link', { name: moreDetailsLinkName });
      userEvent.click(moreDetailsLink);

      const firstExpectedLocation = pokemonTest.foundAt[0];
      const secondExpectedLocation = pokemonTest.foundAt[1];
      const locationsTitle = screen.getByRole('heading', {
        level: 2,
        name: `Game Locations of ${pokemonTest.name}`,
      });
      const locationMaps = screen.getAllByAltText(`${pokemonTest.name} location`);
      const firstLocationName = screen.getByText(firstExpectedLocation.location);
      const secondLocationName = screen.getByText(secondExpectedLocation.location);

      expect(locationsTitle).toBeInTheDocument();
      expect(firstLocationName).toBeInTheDocument();
      expect(secondLocationName).toBeInTheDocument();
      expect(locationMaps).toHaveLength(2);
      expect(locationMaps[0]).toHaveAttribute('src', firstExpectedLocation.map);
      expect(locationMaps[1]).toHaveAttribute('src', secondExpectedLocation.map);
      expect(locationMaps[0]).toHaveAttribute('alt', `${pokemonTest.name} location`);
      expect(locationMaps[1]).toHaveAttribute('alt', `${pokemonTest.name} location`);
    });
  it('testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const pokemonTest = pokemons[0];
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: moreDetailsLinkName });
    userEvent.click(moreDetailsLink);

    const favoriteButton = screen.getByRole('checkbox');
    const favoriteByLabelButton = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteButton);
    expect(favoriteByLabelButton).toBeInTheDocument();

    const expectedFavoritedAltText = `${pokemonTest.name} is marked as favorite`;
    const favoriteImg = screen.getByAltText(expectedFavoritedAltText);
    expect(favoriteImg).toBeInTheDocument();

    userEvent.click(favoriteButton);
    const favoriteImg1 = screen.queryByAltText(expectedFavoritedAltText);
    expect(favoriteImg1).not.toBeInTheDocument();

    userEvent.click(favoriteButton);
    const favoriteImg2 = screen.queryByAltText(expectedFavoritedAltText);
    expect(favoriteImg2).toBeInTheDocument();
  });
});
