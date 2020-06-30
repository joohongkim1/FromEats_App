import React from 'react';

const StoreListView = ({stores, loading}) => {
    let storeList = <h1>loading...</h1>
    if(!loading) {
        storeList = stores.map( (store) => <li key={store.id} store={store}>{store.store_name}</li>)
    }

    return (
        <div>
            {storeList}
        </div>
    );
};

export default StoreListView;