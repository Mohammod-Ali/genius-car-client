import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ServiceCart from './ServiceCart';

const Services = () => {
    const [services, setServices] = useState([])
    const [isAsc, setIsAsc] = useState(true)
    const [search, setSearch] = useState('')
    const searchRef = useRef()

    useEffect( () => {
        fetch(`http://localhost:5000/services?search=${search}&order=${isAsc ? 'asc' : 'desc'}`)
        .then(res => res.json())
        .then(data => setServices(data))
    },[isAsc])

    const handleSearch = () =>{
        setSearch(searchRef.current.value)
    }

    return (
        <div>
            <div className='text-center mb-5'>
                <p className='text-2xl font-bold text-orange-600'>Service</p>
                <h2 className='text-5xl font-semibold'>Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                <input ref={searchRef} type="text" name="" id="" /> <button  onClick={handleSearch}>Search</button>
                <button className='btn' onClick={() => setIsAsc(!isAsc)}>{isAsc ? 'desc' : 'asc'}</button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map(service => <ServiceCart
                        key={service._id}
                        service={service}
                    ></ServiceCart>)
                }
            </div>
        </div>
    );
};

export default Services;