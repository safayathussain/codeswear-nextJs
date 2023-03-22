import Link from 'next/link'
import React, { useEffect } from 'react'
import mongoose from "mongoose";
import Product from '@/models/Product';

const Tshirts = ({ products }) => {
  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
        {Object.keys(products) == 0 && <p className='text-white text-xl text-center my-36'>Sorry all the tshirts are currently out of stock. New stock comming soon!</p>}
          <div className="flex flex-wrap -m-4">
            {
              Object.keys(products).map(p =><Link key={products[p]._id} passHref={true} href={`/product/${products[p].slug}`} className='lg:w-1/5 md:w-1/3 sm:w-1/2 w-full p-4 w-full shadow-md hover:shadow-blue rounded-md duration-300'>
                <div className="block relative h-auto sm:max-h-[25rem] md:max-h-[18rem] lg:max-h-[20rem] rounded overflow-hidden">
                  <img alt="" className="object-cover object-top w-full h-full block" src={products[p].img} />
                </div>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[p].category}</h3>
                  <h2 className="text-white title-font text-lg font-medium">{products[p].title.length > 40 ? products[p].title.slice(0, 40)+ '...' :products[p].title}</h2>
                  <div className="text-gray-200 text-xs title-font mb-1 py-2 ml-[-4px]">
                    {products[p].size.includes('S') && <span className='border p-1 m-1 text-xs rounded-sm border-gray-200'>S</span>}
                    {products[p].size.includes('M') && <span className='border p-1 m-1 text-xs rounded-sm border-gray-200'>M</span>}
                    {products[p].size.includes('L') && <span className='border p-1 m-1 text-xs rounded-sm border-gray-200'>L</span>}
                    {products[p].size.includes('XL') && <span className='border p-1 m-1 text-xs rounded-sm border-gray-200'>XL</span>}
                    {products[p].size.includes('XXL') && <span className='border p-1 m-1 text-xs rounded-sm border-gray-200'>XXL</span>}
                  </div>
                  <div className="text-gray-200 text-xs title-font mb-1 py-2 ml-[-4px]">
                    {products[p].color.includes('red') && <button className=' p-3 m-1 rounded-full bg-red-600'></button>}
                    {products[p].color.includes('green') && <button className=' p-3 m-1 rounded-full bg-green-600'></button>}
                    {products[p].color.includes('black') && <button className=' p-3 m-1 rounded-full bg-black'></button>}
                    {products[p].color.includes('yellow') && <button className=' p-3 m-1 rounded-full bg-yellow-500'></button>}
                    {products[p].color.includes('purple') && <button className=' p-3 m-1 rounded-full bg-purple-600'></button>}
                    {products[p].color.includes('blue') && <button className=' p-3 m-1 rounded-full bg-blue'></button>}
                  </div>
                  <p className="mt-1">${products[p].price}</p>
                </div>
              </Link>)
            }
          </div>
        </div>
      </section>
    </div>
  )
}



export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: 'tshirt' })
  let tshirts = {}
    for (let item of products) {
        if (item.title in tshirts) {
            if (!tshirts[item.title].color.includes(item.color) && item.availavleQty > 0) {
                tshirts[item.title].color.push(item.color)
            }
            if (!tshirts[item.title].size.includes(item.size) && item.availavleQty > 0) {
                tshirts[item.title].size.push(item.size)
            }
        }
        else {
            tshirts[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availavleQty > 0) {
                tshirts[item.title].color = [item.color]
                tshirts[item.title].size = [item.size]
            }
        }
    }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  }
}
export default Tshirts