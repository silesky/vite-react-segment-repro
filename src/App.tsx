import React, { ReactElement, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { AnalyticsBrowser } from "@segment/analytics-next";

const AnalyticsContext = React.createContext<AnalyticsBrowser>(undefined!);

export const AnalyticsProvider: React.FC<{
  writeKey: string;
  children: ReactElement;
}> = ({ children, writeKey }) => {
  const analytics = React.useMemo(
    () => AnalyticsBrowser.load({ writeKey }),
    [writeKey]
  );
  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Create an analytics hook that we can use with other components.
export const useAnalytics = () => {
  const result = React.useContext(AnalyticsContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};

function App() {
  const [count, setCount] = useState(0);
  const analytics = useAnalytics();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default (
  <AnalyticsProvider writeKey="9lSrez3BlfLAJ7NOChrqWtILiATiycoc">
    <App />
  </AnalyticsProvider>
);
