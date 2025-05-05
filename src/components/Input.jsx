import React from 'react'
import { useField, } from 'formik';
const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label className='flex gap-4'>
                <p className='font-semibold text-lg'>{label}</p>
                <input {...field} {...props} />
            </label>
            <div>
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </div>
        </>
    )
}

export default Input
