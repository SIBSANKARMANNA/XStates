import useFetch from "./useFetch";
import {useState} from 'react';

function Cities() {
    const [country,setCountry] = useState('');
    const [state,setState] = useState('');
    const [city,setCity] = useState('');
    const base_url='https://location-selector.labs.crio.do'
    const {data:countries, loading, error} = useFetch(`${base_url}/countries`);



    const {data:states, loading: statesLoading, error: statesError} = useFetch(country?`${base_url}/country=${country}/states`:null);
    const {data:cities, loading: citiesLoading, error: citiesError} = useFetch(state?`${base_url}/country=${country}/state=${state}/cities`:null);


    if (loading) return <div>Countries Loading...</div>;
    if (error) return <div>Error in Countries: {error}</div>;


    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Select Locations</h1>

            <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                {country && (
                    <>
                        {statesLoading && <p>Loading States...</p>}
                        {statesError && <div>Error in States: {statesError}</div>}
                        <select value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="">Select State</option>
                            {states.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </>
                )}

                {state && (
                    <>
                        {citiesLoading && <p>Loading Cities...</p>}
                        {citiesError && <div>Error in Cities: {citiesError}</div>}
                        <select value={city} onChange={(e) => setCity(e.target.value)}>
                            <option value="">Select City</option>
                            {cities.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </>
                )}
            </div>

            {country && state && city && (
                <p style={{textAlign:'center'}}>You selected: <span style={{fontWeight: 'bold'}}>{country}</span> , {state} , {city}</p>
            )}

        </div>
    );
}

export default Cities;
