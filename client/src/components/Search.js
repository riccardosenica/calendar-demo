import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Appointment from './Appointment';
import { Link } from 'react-router-dom';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        createdBy {
          id
          name
        }
        follows {
          id
          user {
            id
          }
        }
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
        <input
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button
          onClick={() =>
            executeSearch({
              variables: { filter: searchFilter }
            })
          }
        >
          OK
        </button>
      </div>
      {/* {data &&
        data.feed.appointments.map((appointment, index) => (
          <Link key={appointment.id} link={appointment} index={index} />
        ))} */}
    </>
  );
};

export default Search;