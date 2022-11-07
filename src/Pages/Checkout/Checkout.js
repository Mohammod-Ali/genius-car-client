import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price} = useLoaderData()
    const {user} = useContext(AuthContext)

    const handlePlaceOrder = event => {
        event.preventDefault()
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`
        const email = user?.email || 'unregistered'
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email, 
            phone, 
            message
        }

        // if(phone.length > 10){
        //     alert('phone number should be 10 characters or longer')
        // }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('geniusToken')}`
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data =>{ 
            console.log(data)
            form.reset()
            if(data.acknowledged){
                alert("Order Place successfully")
                form.reset()
            }
        })
        .catch(er => console.error(er))

    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className="text-4xl ">You are about to order: {title}</h2>
                <h3 className="text-3xl mb-2">Price: {price}</h3>
           <div className='grid grid-cols-1 lg:grid-cols-2 gap-5  mb-3'>
           <input  name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full" />
            <input name='lastName'  type="text" placeholder="Last Name" className="input input-bordered w-full" />
            <input name='email'  type="text" defaultValue={user?.email} readOnly placeholder="Your Email" className="input input-bordered w-full " />
            <input name='phone' required type="text" placeholder="Your Phone" className="input input-bordered w-full" />
           </div>

           <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your message"></textarea>

           <input className='btn' type="submit" value="Place Your Order" />

            </form>
        </div>
    );
};

export default Checkout;