import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import { isPokemonFavoriteByIdType } from '../types';

describe('testa componente Pokedex', () => {
  it('testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteByIdType }
    />);

    const heading = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
  it('testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteByIdType }
    />);

    const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    const firstPokemon = screen.queryByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const secondPokemon = screen.getByText('Charmander');
    const previousPokemon = screen.queryByText('Pikachu');
    expect(previousPokemon).not.toBeInTheDocument();
    expect(secondPokemon).toBeInTheDocument();
  });
  it('testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteByIdType }
    />);

    const firstPokemon = screen.queryByText('Pikachu');
    const secondPokemon = screen.queryByText('Charmander');
    const moreDetailsLink = screen.getAllByRole('link', { name: 'More details' });

    expect(firstPokemon).toBeInTheDocument();
    expect(secondPokemon).not.toBeInTheDocument();
    expect(moreDetailsLink).toHaveLength(1);
  });
  it('testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteByIdType }
    />);
    const firePokemons = ['Charmander', 'Rapidash'];
    const filterButtonsTotalNumber = 7;
    const pokemonTypesNames = ['Electric',
      'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    const allPokemonsButton = screen.getByRole('button', { name: 'All' });
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const nextPokemonButton = screen.getByTestId('next-pokemon');
    const fireFilterButtom = filterButtons[1];

    expect(filterButtons).toHaveLength(filterButtonsTotalNumber);
    expect(allPokemonsButton).toBeInTheDocument();

    pokemonTypesNames.forEach((type, index) => {
      expect(filterButtons[index].innerHTML).toBe(type);
    });

    userEvent.click(fireFilterButtom);
    const charmander = screen.getByText(firePokemons[0]);
    expect(charmander).toBeInTheDocument();
    expect(allPokemonsButton).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const rapidash = screen.getByText(firePokemons[1]);
    expect(rapidash).toBeInTheDocument();
    expect(allPokemonsButton).toBeInTheDocument();
  });
  it('testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteByIdType }
    />);

    const expectedPokemonNameOrder = pokemons.filter(({ name }) => name !== 'Pikachu');
    const allPokemonsButton = screen.getByRole('button', { name: 'All' });
    const nextPokemonButton = screen.getByTestId('next-pokemon');
    const firstPokemon = screen.getByText('Pikachu');
    const electricFilterButton = screen.getByRole('button', { name: 'Electric' });

    expect(allPokemonsButton.innerHTML).toBe('All');
    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(electricFilterButton);
    const electricPokemon = screen.getByText('Pikachu');
    expect(electricPokemon).toBeInTheDocument();

    userEvent.click(allPokemonsButton);
    expectedPokemonNameOrder.forEach((pokemon) => {
      userEvent.click(nextPokemonButton);
      const currentPokemon = screen.getByText(pokemon.name);
      expect(currentPokemon).toBeInTheDocument();
    });
  });
});
