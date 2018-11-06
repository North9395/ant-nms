let initHeaders = new Headers();
initHeaders.append('Accept', 'application/json, text/plain, */*');
initHeaders.append('Cache-Control', 'no-cache');
initHeaders.append('Content-Type', 'application/json;charset=UTF-8');

function myFetch(url, method = 'get', body) {
    let init = {
        method,
        headers: initHeaders,
        cache: 'no-cache',
    }
    if (body) {
        init.body = JSON.stringify(body);
    }
    return fetch(url, init)
            .then(res => {
                if ((res.status >= 200 && res.status < 300) || res.status === 304 )
                 return Promise.resolve(res.json())
                else {
                    const error = new Error("not found")
                    error.response = res;
                    return Promise.reject(error);
                }
            })
            .catch(e => {
                // Promise.reject(e);
            })
}

export default myFetch;