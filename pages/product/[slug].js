import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react';
import mongoose from 'mongoose';
import Product from '@/models/Product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slug = ({buyNow, addToCart, product, variants }) => {
  const router = useRouter()
  const { slug } = router.query;
  const [pin, setPin] = useState()
  const [service, setService] = useState()

  const checkServiceAbility = async () => {
    let pinData = await fetch(`${process.env.HONEXT_PUBLIC_HOSTST}/api/pincode`);
    let pins = await pinData.json()
    if (pins.includes(parseInt(pin))) {
      setService(true)
      toast.success('your pincode is serviceable')
    }
    else {
      toast.error('your pincode is not serviceable')
      setService(false)
    }
  }
  const handlePinField = (e) => {
    setPin(e.target.value)
  }
  const [color, setColor] = useState(product.color)
  const [size, setSize] = useState(product.size)
  const refreshVariants = (newColor, newSize) => {
    const url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]['slug']}`
    window.location = url;
  }

  return <div>
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
    <ToastContainer autoClose={1000} position="bottom-center"/>
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex justify-center flex-wrap">
          <img alt="" className="lg:w-1/2 sm:w-2/3 w-full h-full hover:scale-[1.02] duration-300 object-cover object-center rounded" src={product.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
            <h1 className="text-white text-3xl title-font font-medium mb-1">{product.title} <span className='text-xl'>({product.size}/{product.color})</span></h1>
            <div className="flex mb-4 text-blue">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 space-x-2">
                <a>
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a>
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a>
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={() => refreshVariants('blue', size)} className={`border-2 border-gray-800 bg-blue rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={() => refreshVariants('white', size)} className={`border-2 border-gray-800 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button onClick={() => refreshVariants('black', size)} className={`border-2 border-gray-800 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'black' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={() => refreshVariants('red', size)} className={`border-2 border-gray-800 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={() => refreshVariants('green', size)} className={`border-2 border-gray-800 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button onClick={() => refreshVariants('yellow', size)} className={`border-2 border-gray-800 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'yellow' ? 'border-black' : 'border-gray-300'}`}></button>}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative shadow-sm hover:shadow-blue">
                  <select value={size} onChange={(e) => refreshVariants(color, e.target.value)} className="rounded border border-gray-700 focus: focus:ring-blue-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-blue-500 text-white pl-3 pr-10">
                    {Object.keys(variants[color]).includes('S') && <option className='bg-gray-800' value={'S'}>S</option>}
                    {Object.keys(variants[color]).includes('M') && <option className='bg-gray-800' value={'M'}>M</option>}
                    {Object.keys(variants[color]).includes('L') && <option className='bg-gray-800' value={'L'}>L</option>}
                    {Object.keys(variants[color]).includes('XL') && <option className='bg-gray-800' value={'XL'}>XL</option>}
                    {Object.keys(variants[color]).includes('XXL') && <option className='bg-gray-800' value={'XXL'}>XXL</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 items-start">
              <span className="title-font font-medium text-2xl text-white">$58.00</span>
              <div className='flex gap-3 ml-0 sm:ml-auto'>
                <button onClick={() => addToCart(slug, 1, product.price, product.title, size, color)} className="flex text-white bg-blue border-0 py-2 px-3 md:px-6 focus:outline-none hover:bg-blue-600 rounded">Add to cart</button>
                <button onClick={() => buyNow(slug, 1, product.price, product.title, size, color)} className="flex text-blue bg-white  border-0 py-2 px-3 md:px-6 focus:outline-none hover:bg-blue-600 rounded">Buy now</button>
              </div>
              <button className="rounded-full w-10 h-10 bg-white p-0 border-0 inline-flex items-center justify-center text-white ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 text-blue" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className='flex items-center mt-10 gap-0'>
              <input onChange={handlePinField} className='p-2 rounded-l-sm text-black focus:outline-none' type={'text'}></input>
              <button onClick={checkServiceAbility} className="flex text-white bg-blue border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-r-sm">Check</button>
            </div>
            {
              (!service && service != null) && <div className={`text-red-600 my-2 `}>
                sorry! no services available
              </div>
            }
            {
              (service && service != null) && <div className='text-green-600 my-2'>
                yay! services available
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  </div>
}


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.slug })
  let variants = await Product.find({ title: product.title })
  let colorSizeSlug = {}
  for (const item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }, // will be passed to the page component as props
  }
}
// i want to make {red: {xl: {slug: wear-the-code-xl}}}
export default Slug