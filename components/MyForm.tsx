"use client"
import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextInput, SelectInput, DateInput } from './FormInputs'; // Adjust the path as necessary

// Define the Zod schema
const schema = z.object({
    name: z.string().min(1, "Name is required -wrong"),
    email: z.string().email("Invalid email address -wrong"),
    age: z.preprocess((value) => Number(value), z.number().min(18, "You must be at least 18 years old")),
    birthdate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
    gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: "Gender is required" }),
    }),
});

// Define the form data type based on the schema
type FormData = z.infer<typeof schema>;

const MyForm: React.FC = () => {
    const methods = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log('Form Data:', data);
    };

    return (
        <div className=" h-[100vh] w-full flex justify-center items-center">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="w-1/2 md:w-1/3 mx-auto p-4 bg-white rounded-lg shadow-md">
                    <TextInput name="name" label="Name" />
                    <TextInput name="email" label="Email" />
                    <TextInput name="age" label="Age" type="number" />
                    <DateInput name="birthdate" label="Birthdate" />
                    <SelectInput
                        name="gender"
                        label="Gender"
                        options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                            { value: 'kocu', label: 'kocu' },
                        ]}
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </FormProvider>
        </div>
    );
};

export default MyForm;
