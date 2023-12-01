// ProfileForm.js
import React, { useState } from 'react';
interface FormData {
    name: string;
    location: string;
    jobTitle: string;
    university: string;
    bio: string;
}

interface ProfileFormProps {
    onSubmit: (formData: FormData) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [university, setUniversity] = useState('');
    const [bio, setBio] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            name,
            location,
            jobTitle,
            university,
            bio,
        };
        onSubmit(formData);
    };

    return (
        <>
        <div className="relative top-40">
        <h2 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl mb-4">Update your profile</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4 ">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                    Location:
                </label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="jobTitle" className="block text-gray-700 text-sm font-bold mb-2">
                    Job Title:
                </label>
                <input
                    type="text"
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="university" className="block text-gray-700 text-sm font-bold mb-2">
                    University:
                </label>
                <input
                    type="text"
                    id="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
                    Bio:
                </label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
            </div>

            <div className="mb-6">
                <button
                    type="submit"
                    className="text-black py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-bold transition transform hover:-translate-y-0.5"
                >
                    Submit
                </button>
            </div>
        </form>
        </div>
        </>
    );
};

export default ProfileForm;
