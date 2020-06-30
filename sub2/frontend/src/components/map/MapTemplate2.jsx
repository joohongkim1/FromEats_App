import React, {useEffect, useState} from 'react';
import HTTP from '../../modules/api/client';
// import MapView from './MapView';
import MapView3 from './MapView3';
// import StoreListView from './StoreListView';

const MapTemplate2 = () => {
    const [stores, setStores] = useState({});
    const [loading, setLoading] = useState(false);
    const [area, setArea] =useState([]);
    useEffect(() => {
        getStores();
        setArea('서울중구');
    }, [])

    const getStores = async () => {
        setLoading(true);
        let response = await HTTP.get(`api/map?search=점심두둑히먹어야할든든파-분식,버거!리마리오뺨치는느끼함을원하는버터파-버거,피자!서울중구`);
        console.log("---- getStores에서 부름 ---- ");
        console.log(response.data.results[0]);
        console.log(response.data.results);
        setStores(response.data.results);
        setLoading(false);
    }

    return (
        <div>
            {/* <MapView/> */}
            <br/>
            <MapView3 stores={stores} loading={loading} area={area}/>
            {/* <StoreListView stores={stores} loading={loading}/> */}
        </div>
    );
};

export default MapTemplate2;