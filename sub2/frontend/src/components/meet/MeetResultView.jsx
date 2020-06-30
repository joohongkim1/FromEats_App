import React, {useEffect} from 'react';

const MeetResultView = (personName) => {
    useEffect(() => {
        console.log({personName}.personName.personName)
    }, [personName])

    return (
        <div>
            <h1>Meet Result View 입니다.</h1>
        </div>
    );
};

export default MeetResultView;