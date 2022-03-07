import { ArrowNarrowRightIcon } from '@heroicons/react/solid';
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../sanity'

export default function Blogs({ home }) {
    const count = home ? '[0...3]' : '';
    const [posts, setPosts] = useState();
    useEffect(() => {
        const query = `*[_type == 'post']{
            _id,
            title,
            author-> {
              name,
              image
            },
            description,
            mainImage,
            slug
          }${count}`;

        ; (async () => {
            const posts = await sanityClient.fetch(query);
            setPosts(posts)
        })();
    }, [])

    return (
        <>
            <div className='max-w-7xl mx-auto p-5 xl:py-10'>
                <h1 className='text-4xl sm:text-5xl xl:text-6xl text-white text-center mb-10 font-semibold '>Latest Blogs</h1>
                <div className='grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 p-2 py-5'>
                    {posts?.map(post => <Link key={post._id} href={`/blog/${post.slug.current}`}>
                        <div className='group cursor-pointer border rounded-lg overflow-hidden blur-blue'>
                            <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.mainImage)?.url()} alt="" />
                            <div className='flex items-center justify-between p-5 space-x-2'>
                                <div>
                                    <p className='text-lg font-bold text-white'>{post.title}</p>
                                    <p className='text-sm text-gray-100'>{post.description} <br /> by <span className="text-yellow-300 italic">{post.author.name}</span></p>
                                </div>
                                <img className='h-12 w-12 rounded-full' src={urlFor(post.author.image)?.url()} alt="" />
                            </div>
                        </div>
                    </Link>)}
                </div>
                {home && <Link href='/blogs'>
                    <button className="btn-blue mt-5 cursor-pointer px-6 py-3 text-xl font-semibold rounded-full mx-auto flex items-center min-w-max">View All <ArrowNarrowRightIcon className='h-7 ml-2 hover:scale-x-125 hover:transform origin-left transition-sm' /></button>
                </Link>}

            </div>
        </>
    )
}

