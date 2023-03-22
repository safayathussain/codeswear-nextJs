import Order from '@/models/Order'
import mongoose from 'mongoose'
import React from 'react'

const orders = () => {
    return (
        <div classNameName='bg-white'>
            <div classNameName=''>
                <h1>My Orders</h1>
                <div className="flex flex-col container px-5 py-24 mx-auto">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                #
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                First
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Last
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Handle
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white hover:bg-blue duration-100 transition-all ease-in rounded hover:text-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                Mark
                                            </td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                Otto
                                            </td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                @mdo
                                            </td>
                                        </tr>
                                        <tr className="bg-white hover:bg-blue duration-100 transition-all ease-in rounded hover:text-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">2</td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                Jacob
                                            </td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                Dillan
                                            </td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                @fat
                                            </td>
                                        </tr>
                                        <tr className="bg-white hover:bg-blue duration-100 transition-all ease-in rounded hover:text-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">3</td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                Mark
                                            </td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                Twen
                                            </td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                @twitter
                                            </td>
                                        </tr>
                                        <tr className="bg-white hover:bg-blue duration-100 transition-all ease-in rounded hover:text-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">4</td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                Bob
                                            </td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                Dillan
                                            </td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                @fat
                                            </td>
                                        </tr>
                                        <tr className="bg-white hover:bg-blue duration-100 transition-all ease-in rounded hover:text-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">5</td>
                                            <td colspan="2" className="text-sm  font-light px-6 py-4 whitespace-nowrap text-center">
                                                Larry the Bird
                                            </td>
                                            <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                @twitter
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI)
    }
    let orders = await Order.find({ })
  
    return {
      props: { orders: orders }, // will be passed to the page component as props
    }
  }
export default orders