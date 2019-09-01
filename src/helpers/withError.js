import React from 'react';

const withError = WrappedComponent => ({error, children}) => {
  return (
    <WrappedComponent>
      {error && <span className='error'>{error}</span>}
      {children}
    </WrappedComponent>
  );
};

const ComponentWithErrorHandling = withError(({children}) => <div>{children}</div>);

export default ComponentWithErrorHandling;