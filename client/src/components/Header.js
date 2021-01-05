import React from 'react';
import { useHistory } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

const Header = () => {
    const history = useHistory();
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
        <div className="flex pa1 justify-between nowrap orange">
            <div className="flex flex-fixed black">
                <div className="fw7 mr1">Store!</div>
                <Link to="/" className="ml1 no-underline black">Top list</Link>
                <div className="ml1"> --- </div>
                <Link to="/create" className="ml1 no-underline black">Create new</Link>
            </div>
            <div className="flex flex-fixed">
                {authToken ? (
                    <div className="ml1 pointer black"
                        onClick={() => {
                            localStorage.removeItem(AUTH_TOKEN);
                            history.push(`/`);
                        }}
                    >Logout</div>
                ) : (
                        <Link to="/login" className="ml1 no-underline black">Login</Link>
                    )}
            </div>
        </div>
    );
};

export default Header;