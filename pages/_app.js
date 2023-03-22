import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
    setProgress(40)
  })
    router.events.on('routeChangeComplete', () => {
    setProgress(100)
  })
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      console.log(error)
      localStorage.clear()
    }
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ value: token })
    }
    setKey(Math.random()) 
  }, [router.query])

  const saveCart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart))
    let subTotal = 0;
    let keys = Object.keys(mycart);
    for (let i = 0; i < keys.length; i++) {
      if (mycart[keys[i]]) {

        subTotal += mycart[keys[i]].price * mycart[keys[i]].qty;
      }
    }

    setSubTotal(subTotal)
  }
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, name, price, size, variant }
    }
    setCart(newCart)
    saveCart(newCart)
  }
  const buyNow = (itemCode, qty, price, name, size, variant) => {
    saveCart({})
    let newCart = { itemCode: { qty: 1, name, price, size, variant } };

    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }
  const clearCart = () => {
    setCart({})
    saveCart({})
  }
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }
  const logout = () => {
    localStorage.removeItem("token")
    setKey(Math.random())
    setUser({ value: null })
    router.push('/login')
  }

  return <>
    <Head>
      <title>Codeswear</title>
      <meta name="description" content="Codeswear is a ecommerce web service" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <LoadingBar
      color='#0079DD'
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      waitingTime={400}
    />
    {key && <Navbar key={key} logout={logout} user={user} cart={cart} addToCart={addToCart} buyNow={buyNow} removeFromCart={removeFromCart} clearCart={clearCart} saveCart={saveCart} subTotal={subTotal} />}
    <Component cart={cart} addToCart={addToCart} buyNow={buyNow} removeFromCart={removeFromCart} clearCart={clearCart} saveCart={saveCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
}
