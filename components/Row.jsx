import moment from 'moment'
import Router from 'next/router'
import Coin from './Coin'

function Row({ question }) {
    const handleClick = () => {
        Router.push({
            pathname: `/question/${question?.questionId}`,
        })
    }
    return (
        <>
            <tr className="hover:bg-gray-50 transition delay-75 cursor-pointer" onClick={handleClick}>
                <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center flex-col sm:flex-row">
                        <div className="flex-shrink-0 h-10 w-10 m-2">
                            <img className="h-10 w-10 rounded-full shadow-lg border-2 border-white hover:scale-[1.02] transition-md" src={question?.image_url || `/images/que/${question?.category.toLowerCase()}.jfif`} alt="" />
                        </div>
                        <div className="sm:ml-2">
                            <div className="text-sm sm:text-base font-medium text-gray-900">
                                {question?.category}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="p-4">
                    <div className="text-sm sm:text-base text-gray-900 max-w-sm min-w-[384px] break-words">{question?.question}</div>
                </td>
                <td className="p-4 whitespace-nowrap text-sm sm:text-base text-gray-600 text-center">
                    {moment(question?.createdAt).format('lll')}
                </td>
                <td className="p-4 whitespace-nowrap text-sm sm:text-base text-gray-600 text-center">
                    <div className="flex items-center justify-center">
                        <Coin width="4" height="4" />{question?.amount}
                    </div>
                </td>
                <td className="p-4 whitespace-nowrap text-center">
                    {question?.qstatus === 'verified' ?
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Active</span>
                        : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Closed</span>}
                </td>
            </tr>
        </>
    )
}

export default Row
