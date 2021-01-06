import { useQuery } from '@apollo/react-hooks';
function EventType({ types }) {
  const { loading, error, data } = useQuery(GET_EVENT_TYPES);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <select name="type" onChange={onTypeSelected}>
      {data.types.map(type => (
        <option key={type.id} value={type.name}>
          {type.name}
        </option>
      ))}
    </select>
  );
}