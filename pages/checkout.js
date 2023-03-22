import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'

const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [disabled, setDisabled] = useState(true)
  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
    }
    if (name.length > 3 && email.length > 3 && address.length > 3 && phone.length > 3 && pincode.length > 3) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    let oid = Math.floor(Math.random() * Date.now())
    const data = { name, email, address, phone, pincode, cart, subTotal, oid }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let response = await res.json()
    console.log(response)
  }
  return (
    <div className='container py-16'>
      <form onSubmit={handleSubmit}>
        <h1 className='text-center text-2xl font-medium my-7'>Checkout</h1>
        <div>
          <h5 className='text-md font-medium my-3'>1. Delivery Details</h5>
          <div className='flex gap-5'>
            <div className="mb-4 w-1/2">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input value={name} onChange={handleChange} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="mb-4 w-1/2">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input value={email} onChange={handleChange} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea value={address} onChange={handleChange} id="address" rows={3} name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
          <div className='flex gap-5'>
            <div className="mb-4 w-1/2">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input value={phone} onChange={handleChange} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="mb-4 w-1/2">
              <label htmlFor="pinCode" className="leading-7 text-sm text-gray-600">PinCode</label>
              <input value={pincode} onChange={handleChange} type="pinCode" id="pinCode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='flex gap-5'>
            <div className="mb-4 w-1/2">
              <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
              <input value={state} readOnly={true} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="mb-4 w-1/2">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
              <input value={city} readOnly={true} type="city" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <h5 className='text-md font-medium my-3'>2. Review Cart Items</h5>
        <div className='p-5 my-5 rounded-md duration-300 bg-blue'>
          <ol className='list-decimal pl-5 text-white'>
            {Object.keys(cart) == 0 && <div className='text-white'>Your cart is empty!</div>}
            {
              Object.keys(cart).map(k => {
                return <li key={k}>
                  <div className='flex gap-36 py-2.5'>
                    <p>{cart[k].name}<span className='text-xs'>({cart[k].size}/{cart[k].variant})</span></p>
                    <div className='flex gap-3 items-center'>
                      <AiOutlineMinusCircle onClick={() => removeFromCart(k, 1, 58, 'tshirt', 'Xl', 'blue')} className='cursor-pointer' />
                      <p>{cart[k].qty}</p>
                      <AiOutlinePlusCircle onClick={() => addToCart(k, 1, 58, 'tshirt', 'Xl', 'blue')} className='cursor-pointer' />
                    </div>
                  </div>
                </li>
              })
            }

          </ol>
          <p className='text-white font-medium text-lg pt-5'>Subtotal: $<span>{subTotal}</span></p>
        </div>
        <button type='submit' disabled={disabled} className="flex disabled:bg-[#B9CFF0] text-white my-3 bg-blue border-0 py-2 px-8 focus:outline-none rounded text-sm">Pay ${subTotal}</button>
      </form>
    </div>
  )
}

export default Checkout