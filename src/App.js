import "./App.css";
import { UsersView, ErrorBoundary } from "./components";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <UsersView />
      </ErrorBoundary>
    </div>
  );
}

export default App;

// TODO: use single input for cellInput and searchInput
// TODO: useFetch
// TODO: thorough check of the code working
// TODO: break test into multiple test. one test should test only one thing.
// TODO: make the code extensible
// TODO: responsive web design.


// todo: testing 
// write test for error boundary and pagination, table, table options, usersview