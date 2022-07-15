import React from 'react';
import { useHistory } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { AUTH_TOKEN } from '../../constants';

const Header = () => {
    const history = useHistory();
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
        <div className="flex pa1 justify-between nowrap orange">
            <div className="flex flex-fixed black">
                <Link to="/" className="ml1 no-underline black">List</Link>
            </div>
            <div className="flex flex-fixed black">
                <Link to="/calendar" className="ml1 no-underline black">Calendar</Link>
            </div>
            <div className="flex flex-fixed">
                <Link to="/create" className="ml1 no-underline black">New</Link>
            </div>
        </div>
    );
};

export default Header;