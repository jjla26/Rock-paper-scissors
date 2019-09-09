const baseUrl = 'http://localhost:3000/api'

async function request(url,method, data) {
    const response = await fetch(`${baseUrl}${url}`, {method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },  
        body: data ? JSON.stringify(data) : undefined } )
        if(method !== 'DELETE'){
            const jsonResponse =  await response.json();
            if(response.status !== 200 && response.status !== 201 && response.status !== 204){
                let error;
                if(jsonResponse && jsonResponse.errors){
                    error = jsonResponse.errors[0].message
                }
                return error
            }   
        return jsonResponse
        }
    }

export function create(url,data){
    return request(url, 'POST', data);

}

export function update(url, id, data){
    return request(`${url}/${id}`, 'PUT', data);
}

export function read(url,id){
    if (id)
        return request(`${url}/${id}`)
    else
        return request(`${url}`)

}

export function delet(url,id){
    return request (`${url}/${id}`, 'DELETE')
    
}