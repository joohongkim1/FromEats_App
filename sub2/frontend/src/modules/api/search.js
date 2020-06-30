import HTTP from './client';

export const searchService = {
  search,
  getStoreByCategory,
}

// 검색
async function search(keyword) {

    return HTTP.get('/rest-auth/login', {
      params: {
        search: keyword
      },
      headers: {
        'Access-Control-Allow-Origin': "*",
      }
    },
    { withCredentials: true }
    )
      .then(function (response) {
  
        if (!response) {
          return Promise.reject(response.statusText);
  
        }
  
        // sessionStorage.setItem(
        //   "uid", response.data.list[1].toString()
        // );
        
        
        // sessionStorage.setItem(
        //   "userInfo", response.data.list[2].toString()
        // );
  
        return response;
      })
      .catch(() => {
        return Promise.reject('Backend not reachable');
  
      })
  
  }


// 카테고리별 음식점 분류
async function getStoreByCategory(category) {
  return HTTP.get('/api/storebycate/', {
    params: {
      search: category,
    },
    headers: {
      'Access-Control-Allow-Origin': "*",
    }
  })
  .then(function (response) {
    if(!response) {
      return Promise.reject(response.statusText);
    }
    return response.data;
  })
  .catch(() => {
    return Promise.reject('Backend not reachable');

  })
}