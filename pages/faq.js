import Accordion from "../components/Accordion";

function faq() {
    const accordionData = [
        {
            title: 'What is the Neuron Club?',
            content: `Neuron Club is an application designed for those who are proud to have an opinion. This is a financial exchange for users to trade on opinions regarding the outcome of events of interest`
        },
        {
            title: `How does Neuron Club work?`,
            content: `Neuron Club provides a trading platform where users can trade on the outcome of events. Based on your opinion, you can choose to bet on how a specific event will turn out to be. Once the question is frozen for trading, no more trades are allowed. Thereafter, when the question is decided based on an independent source, the trading pool is distributed amongst those who predicted the correct outcome`
        },
        {
            title: `How is the winning payout decided?`,
            content: `The winner’s payout is proportional to the amount invested in the question. All the trades are combined to create a question prize pool. Once the question has been decided, the question pool is distributed amongst those with a correct prediction, in proportion to the amount invested`
        },
        {
            title: `How is Neuron different from a gambling or betting platform?`,
            content: `There are several fundamental differences between trading on a prediction market vs a gambling platform:`,
            desc: [`On the Neuron platform, you are competing against other players who have a different opinion than you on the events of interest. However, on a gambling platform, you are competing against the booker (sports betting website). So betting websites are incentivized to tweak the odds against you while The Neuron club team remains a neutral market observer and doesn’t take a stake on any side`, `Trading on the Neuron platform is a game of skill. In a game of skill, you can increase your odds of winning by doing research, strategizing, and selectively picking the questions. However, on a betting platform, luck plays a very important role in deciding the winner and anyone can make a bet and get lucky.`, `In a game of skill, players are seen to get better with time as they learn more about the strategies to maximize your winning. However, in a gambling platform, players do not necessarily get better with time`]
        },
        {
            title: `How is Neuron different from a stock trading platform?`,
            content: `Our vision for TheNeruon.club is to develop it along the lines of a stock trading platform and offer users similar functionalities. The Neuron platform allows users to trade on the outcome of events beyond the business domain, thus offering a much wider scope of services`
        },       
        
    ];
    return (
        <div>
            <div className="py-20">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-700 text-center mt-10">Frequently Asked Questions</h1>
                <div className="h-1 w-48 mx-auto my-3 md:my-5 bg-gray-500"></div>
                <div className="p-5">
                    {accordionData.map((item, i) => (
                        <Accordion key={i} title={item.title} content={item.content} desc={item?.desc} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default faq
