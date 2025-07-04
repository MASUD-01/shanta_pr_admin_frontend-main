import { useSearchParams } from 'react-router-dom';

const SetQueyInUrl = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return { searchParams, setSearchParams };
};

export default SetQueyInUrl;
