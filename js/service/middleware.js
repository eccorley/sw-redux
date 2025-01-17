import localforage from 'localforage';

/*
 * @description
 * Will fire a reset action with the persisted state 
 */
export const reset = store => next => action => {
  if (action.type !== 'ACTIVATE') return next(action);
  console.log('Reseting data');
  localforage.getItem('state')
    .then(state => store.dispatch({type: 'RESET', state}))
    .catch(err => {console.log(err); return next(action);});
}; 

/*
 * @desscription
 * Will stash the state of the store into IndexedDB on every update
 */
export const stash = store => next => action => {
  let result = next(action);
  console.log('Stashing Data');
  localforage.setItem('state', store.getState())
    .catch(err => console.log(err));

  return result;
};

