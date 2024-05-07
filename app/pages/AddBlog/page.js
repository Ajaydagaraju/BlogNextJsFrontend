"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const AddBlog = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false)
    const searchParams = useSearchParams()
    const id = searchParams.get('blogid')

    useEffect(() => {
        if (id) {
            getBlogDetails();
        }
    }, [id]);

    const getBlogDetails = async () => {
        let result = await fetch(`http://localhost:6600/read/${id}`, {
            method: "GET",
        }
        );
        result = await result.json();
        setTitle(result?.title);
        setDescription(result?.description);
    };

    const updateBlog = async () => {
        let result = await fetch(`http://localhost:6600/update/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title, description }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        if (result) {
            router.push("/pages/BlogList");
        } else {
            console.log("Something Went Wrong!");
        }
    };

    const addBlog = async () => {
        if (!title || !description) {
            setError(true)
            return false;
        }

        let result = await fetch('http://localhost:6600/create', {
            method: 'post',
            body: JSON.stringify({ title, description }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        result = await result.json()
        if (result) {
            setTitle('')
            setDescription('')
            setMessage("Blog Added Successfully!")
            setTimeout(() => {
                setMessage("")
            }, 2000)
            setError(false)
        }
        // router.push("/pages/BlogList");
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mx-auto max-w-md">
                <h1 className="text-2xl font-bold mb-5 text-center">
                    {
                        id ? "Update Blog" :
                            "Add Blog"
                    }
                </h1>
                <input
                    className="inputBox bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                    type="text"
                    placeholder="Enter Blog Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                {error && !title && <p className="text-red-500 mb-4 ">Blog Name is Required.</p>}
                <textarea
                    className="inputBox bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 mb-4 w-full h-32 resize-none focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 overflow-auto"
                    placeholder="Enter Blog Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
                {error && !description && <p className="text-red-500 mb-4">Blog Description is Required.</p>}
                {message && <p
                        className="inputBox text-white-800 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                >{message}</p>}
                <div className="flex justify-between mt-5">
                    <Link
                        href="/pages/BlogList"
                        className="inputBox bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Show Blog List
                    </Link>
                    <button
                        className="inputBox bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                        type="button"
                        onClick={id ? updateBlog : addBlog}
                    >
                        {
                            id ? "Update Blog" :
                                "Add Blog"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddBlog