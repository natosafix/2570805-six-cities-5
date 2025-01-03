import {useState} from 'react';
import {Map} from '../../components/map/map.tsx';
import {CitiesOfferCardsList} from './cities-offer-cards-list.tsx';
import {CitiesList} from './cities-list.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {OffersSortingOptions} from './offers-sorting-options.tsx';
import {CITIES} from '../../consts/cities.ts';
import {Header} from '../../components/header/header.tsx';
import {Spinner} from '../../components/spinner/spinner.tsx';

export function MainPage(): JSX.Element {
  const isLoading = useAppSelector((state) => state.isOfferPreviewsLoading);
  const [activeOfferPreviewId, setActiveOfferPreviewIdId] = useState<string | null>(null);
  const city = useAppSelector((state) => state.city);
  const offersSortingOption = useAppSelector((state) => state.sortingOption);
  const offerPreviews = useAppSelector((state) => state.offers)
    .filter((o) => o.city.name === city.name)
    .sort(offersSortingOption.compareFn);

  if (isLoading) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header showNavigation/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={CITIES}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offerPreviews.length} places to stay in {city.name}</b>
              <OffersSortingOptions/>
              <CitiesOfferCardsList offerPreviews={offerPreviews} setActiveOfferPreview={setActiveOfferPreviewIdId}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={city} offers={offerPreviews} activeOfferPreviewId={activeOfferPreviewId}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
