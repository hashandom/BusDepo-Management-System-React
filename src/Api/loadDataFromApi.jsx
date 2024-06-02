export const loadDataFromApi = async (endpointurl, requestmethod, requestbody) => {
    try {
        const response = await fetch(endpointurl, {
            method: requestmethod,
            body: JSON.stringify(requestbody),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        // console.log("result",result)
        return result;
    } catch (error) {
        console.log("error",error)
        return [];
    }
};