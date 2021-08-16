import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Appointment from './appointment/Appointment';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      appointments {
        _id
        title
        description
      }
    }
  }
`;

const Search = () => {
    const [searchFilter, setSearchFilter] = useState('');
    const [executeSearch, { data }] = useLazyQuery(
        FEED_SEARCH_QUERY
    );
    return (
        <>
            <div>
                Search
                <input type="text" onChange={(e) => setSearchFilter(e.target.value)}/>
                <button onClick={() => executeSearch({ variables: { filter: searchFilter } })}>OK</button>
            </div>
            {data &&
                data.feed.appointments.map((appointment, index) => (
                    <Appointment key={appointment.id} appointment={appointment} index={index} />
                ))}
        </>
    );
};

export default Search;