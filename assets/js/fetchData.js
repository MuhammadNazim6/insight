const fetchData = async (
    method = "GET",
    url,
    body,
    contentType = "application/json"
) => {
        let res = null;
        if (body && contentType !== "multipart") {
            body = JSON.stringify(body);
        }
        if (contentType === "multipart") {
            contentType = "multipart/form-data";
            res = await fetch(url, {
                method,
                body,
            });
        }else{
            res = await fetch(url, {
                method,
                body,
                headers: {
                    "Content-Type": contentType,
                },
            });
        }
        
        if (res.ok) {
            return (data = await res.json());
        }
        const error = await res.json();
        throw new Error(error.message);
    
};
