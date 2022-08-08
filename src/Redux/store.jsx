import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./Reducers/rootReducer";
import { rootSaga } from "./Saga/rootSaga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the Store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
