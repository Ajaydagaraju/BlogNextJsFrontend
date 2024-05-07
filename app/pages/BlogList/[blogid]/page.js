"use client"

import Link from 'next/link';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';

const BlogDetail = () => {
    const params = useParams()
    const [blog, setBlog] = useState(null);
    const id = params?.blogid

    useEffect(() => {
        if (id) {
            getBlog();
        }
    }, [id]);

    const getBlog = async () => {
        try {
            const response = await fetch(`http://localhost:6600/read/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch blog');
            }
            const data = await response.json();
            setBlog(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Blog Detail</h1>
            <Link
                href="/pages/BlogList"
                className="inputBox bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            >
                Show Blog List
            </Link>
            <div className="blog-card mt-7 bg-white dark:bg-gray-800 shadow-md rounded-md p-4 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105">
                {!blog && <div className='text-center' >Loading....</div>}
                <h3 className="text-lg font-semibold mb-2"> Titel - {blog?.title.toUpperCase()}</h3>
                <p className="text-gray-600 dark:text-gray-400"> Description - {blog?.description}</p>
            </div>
        </div>
    );
};

export default BlogDetail;
