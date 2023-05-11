import React, { useState } from 'react';
import AuthDialog from './AuthDialog';
import useUser from '../useUser';

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, username } = useUser();

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>toggle</button>

      <AuthDialog isOpen={isOpen} hideModal={() => setIsOpen(false)} />
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>isFullyRegistered: {username ? 'true' : 'false'}</pre>
    </div>
  );
};

export default Test;
