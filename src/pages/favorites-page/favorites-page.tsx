import {OfferPreview} from '../../types/offer.ts';
import {FavoritesList} from './favorites-list.tsx';
import {Header} from '../../components/header/header.tsx';

type FavoritesPageProps = {
  favorites: OfferPreview[];
}

export function FavoritesPage({favorites}: FavoritesPageProps): JSX.Element {
  return (
    <div className="page">
      <Header showNavigation/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList favorites={favorites}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="../../../public/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}
