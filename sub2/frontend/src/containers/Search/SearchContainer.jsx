import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, search } from '../../modules/search/search';
import SearchBar from '../../components/Common/SearchBar';

export default function SearchContainer() {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { keyword, result, searchError } = useSelector(( result ) => ({
        keyword: result.keyword,
        result: result.result,
        searchError: result.searchError
    }));
    // 인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, key } = e.target;
        dispatch(
            changeField({
                key: key,
                value,
            }),
        );
    };

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        dispatch(search(keyword));
    };
    // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
    useEffect(() => {
        dispatch(initializeForm());
    }, [dispatch]);

    useEffect(() => {
        if (searchError) {
            console.log('오류 발생');
            console.log(searchError);
            setError('검색 실패');
            return;
        }
        if (result) {
            console.log('검색 성공');
        }
    }, [result, searchError, dispatch]);

    return (
        <div>
            <SearchBar
                keyword={keyword}
                onChange={onChange}
                onSubmit={onSubmit}
                error={error}
            />
        </div>
    )

}