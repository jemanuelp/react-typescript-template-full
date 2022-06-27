import React, { useState, useEffect, Suspense } from 'react';
import Router from './router/Router';
import { getRoutes } from './router/routes';
import { useLayout } from './utility/hooks/useLayout';
import {RouteObject} from "react-router/lib/router";

const App = () => {
  const [, setAllRoutes] = useState<RouteObject[]>([]);
  
  const { layout } = useLayout();

  useEffect(() => {
    setAllRoutes(getRoutes(layout));
  }, [layout]);

  return (
      <Suspense fallback={null}>
        <Router/>
      </Suspense>
  );
};

export default App;
