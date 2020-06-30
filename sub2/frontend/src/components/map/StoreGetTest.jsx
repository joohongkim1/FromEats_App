/* gloabal kakao */
import React, {useEffect, useState} from 'react';
import HTTP from '../../modules/api/client';

const StoreGetTest = () => {
    const [stores, setStores] = useState(null);
    
    useEffect(() => {
        getStores();
    }, []);

    const getStores = async () => {
        let response = await HTTP.get(`/api/stores`);
        // console.log(response);
        setStores(response.data.results);
    }
    if(stores){
        console.log(stores[0].id);
        console.log(stores[0].store_name);
        console.log(stores[0].address);
        return (
            <div>
                <h1>HelloWorld!</h1>
                <p>가게 아이디 : {stores[0].id}</p>
                <p>가게 이름 : {stores[0].store_name}</p>
                <p>가게 주소 : {stores[0].address}</p>
                <p>가게 위도 : {stores[0].latitude}</p>
                <p>가게 경도 : {stores[0].longitude}</p>
            </div>
        );
    }else{
        return (
            <div>
                <h1>HelloWorld!</h1>
            </div>
        );
    }
    
}


export default StoreGetTest;