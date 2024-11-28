import  { useEffect, useState } from 'react';

const Api = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = 'https://huddlehub-75fx.onrender.com/get_token/?channel=MAIN';

        // Log the fetch process for debugging
        console.log('Fetching data from API:', apiUrl);

        fetch(apiUrl)
            .then(response => {
                console.log('Response status:', response.status); // Log the status of the response
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); // Log the data fetched
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error); // Log the error
                setError(error.message);
                setLoading(false);
            });
    }, []); // Empty dependency array to run once when component mounts

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Fetched Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Api;
