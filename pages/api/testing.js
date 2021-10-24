// // import { CronJob } from 'cron'
// // import sendEMail from '../../lib/Mail/sendMail';

// // export default async function (req, res) {
// //     // const CronJob = require('../lib/cron.js').CronJob;

// //     console.log('Before job instantiation');
// //     // let d = '2021-10-12T13:44'
// //     let d = req.body.time;
// //     let date = new Date(d);
// //     console.log(date)
// //     // date.setMinutes(date.getMinutes()+2);
// //     console.log(date)
// //     const job = new CronJob(date, async function () {
// //         const d = new Date();
// //         console.log('Specific date:', date, ', onTick at:', d);
// //         const link = `${process.env.host}/question/${saveQuestion?._id}`;
// //         const data = { subject: `New Question added`, text: link, email: `ankit628792@gmail.com`, html: `Click <a href="${link}" target="_blank">View Question</a>` };
// //         const result = await sendEMail(data);
// //         console.log(result)
// //     });
// //     console.log('After job instantiation');
// //     job.start();
// //     res.status(203).send({ msg: 'pending ..' })
// // }


// import connectDB from '../../server/db/mongodb';
// import Question from '../../server/db/models/question';

// const testing = async (req, res) => {
//     try {
//         const updatedq = await Question.findByIdAndUpdate({ _id: '61694e3dad71ea28781bb569' }, { bidClosing: bidClosing }, { new: true });

//         // const updatetq = await Question.updateMany({ }, { bidClosing: {
//         //     $dateFromString: {
//         //        dateString: '$bidClosing',
//         //     }
//         //  } }, { new: true });
//         res.status(200).send(updatedq)
//     } catch (error) {
//         console.log(error)
//         res.status(400).send({ msg: 'unable to get question' })
//     }
// }

// export default connectDB(testing);