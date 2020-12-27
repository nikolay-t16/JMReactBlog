import React from 'react';
import { ApiConsumer } from '../contexts/apiContext';

const WithApi = (mapMethodsToProps: any) => (Wrapped: any) => (props: any) => (
  <ApiConsumer>
    {(api) => {
      const apiProps = mapMethodsToProps(api);
      return <Wrapped {...props} {...apiProps} />;
    }}
  </ApiConsumer>
);

export default WithApi;
