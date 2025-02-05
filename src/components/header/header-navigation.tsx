import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts/consts.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {logoutAction} from '../../store/api-actions.ts';
import React, {memo} from 'react';
import {getAuthorizationStatus, getCurrentUser} from '../../store/user-process/selectors.ts';
import {getFavorites} from '../../store/offers-data/selectors.ts';

function HeaderNavigationImpl(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const currentUser = useAppSelector(getCurrentUser);
  const favorites = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();

  function handleSignOut(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    evt.preventDefault();
    dispatch(logoutAction());
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img className='user__avatar' src={currentUser!.avatarUrl} />
              </div>
              <span className="header__user-name user__name">{currentUser!.email}</span>
              <span className="header__favorite-count">{favorites.length}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              to={AppRoute.Root}
              onClick={handleSignOut}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export const HeaderNavigation = memo(HeaderNavigationImpl);
