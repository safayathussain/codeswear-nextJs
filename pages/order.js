import React from 'react'

const Order = () => {
  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">codeswear</h2>
              <h1 className="text-white text-3xl title-font font-medium mb-4">Order id: #89777</h1>
              <p className="leading-relaxed mb-4">Your order has been successfully placed</p>
              <div className="flex mb-4">
                <a className="flex-grow border-b-2 text-white border-gray-800 py-2 text-lg px-1">Description</a>
                <a className="flex-grow border-b-2 text-white border-gray-800 py-2 text-center text-lg px-1">Quantity</a>
                <a className="flex-grow border-b-2 text-white border-gray-800 py-2 text-end text-lg px-1">Item Total</a>
              </div>
              <div className="flex border-t border-gray-800 py-2">
                <span className="flex-grow text-start text-md px-1">Item 1</span>
                <span className="flex-grow text-center text-md px-1">1</span>
                <span className="flex-grow text-end text-md px-1">$58</span>
              </div>
              <div className="flex border-t border-gray-800 py-2">
                <span className="flex-grow text-start text-md px-1">Item 1</span>
                <span className="flex-grow text-center text-md px-1">1</span>
                <span className="flex-grow text-end text-md px-1">$58</span>
              </div>
              <div className="flex border-y mb-5 border-gray-800 py-2">
                <span className="flex-grow text-start text-md px-1">Item 1</span>
                <span className="flex-grow text-center text-md px-1">1</span>
                <span className="flex-grow text-end text-md px-1">$58</span>
              </div>
              <div className="flex items-center">
                <span className="title-font font-medium text-2xl text-white">SubTotal: $58.00</span>
                <button className="flex ml-auto text-white bg-blue border-0 py-2 px-6 focus:outline-none rounded">Track Order</button>
              </div>
            </div>
            <img alt="" className="w-full lg:w-1/2 lg:h-auto object-cover object-center rounded" src="https://dummyimage.com/400x400" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Order