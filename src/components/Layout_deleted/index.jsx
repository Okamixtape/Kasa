import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './style.scss';

const Layout = () => {
    const location = useLocation();

    return (
        <div className="page-container">
            <TransitionGroup component={null}>
                <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                    <div className="transition-wrapper">
                        <Outlet />
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
};

export default Layout;
