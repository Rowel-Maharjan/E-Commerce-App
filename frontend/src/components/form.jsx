import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { useForm } from "react-hook-form";
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';

function CommonForm({ formControls, buttonText, onSubmit, currentEdited = null }) {
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm();

    function handleFormSubmit(data) {
        onSubmit(data);
    }

    const [showPassword, setShowPassword] = useState(false)

    //Fill the form for edited Product
    useEffect(() => {
        if (currentEdited) {
            reset(currentEdited)
        }
        else {
            reset()
        }
    }, [currentEdited, reset])


    function renderInputByComponentType(getControlItem) {
        const { componentType, label, name, placeholder, type, options } = getControlItem;

        switch (componentType) {
            case "input":
                return (
                    <div className="relative">
                        <input
                            className="border border-input px-3 py-2 text-sm placeholder:text-muted-foreground rounded-md focus:outline-gray-600 bg-[#e8f0fe] mb-1 w-full"
                            placeholder={placeholder}
                            step="any"
                            type={type === "password" ? (showPassword ? "text" : "password") : type}
                            // type={type}
                            {...register(name, {
                                required: { value: true, message: `Please Enter ${label}` },
                            })}
                        />
                        {type === "password" && (
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        )}
                    </div>
                );

            case "textarea":
                return (
                    <textarea
                        className="border border-input px-3 py-2 text-sm placeholder:text-muted-foreground rounded-md focus:outline-gray-600 bg-[#e8f0fe] mb-1"
                        placeholder={placeholder}
                        {...register(name, {
                            required: { value: true, message: `Please Enter ${label}` },
                        })}
                    />
                );

            case "select":
                return (
                    <select defaultValue="" className="border border-input px-3 py-2 text-sm rounded-md focus:outline-gray-600 bg-[#e8f0fe] mb-1"
                        {...register(name, { required: { value: true, message: `Please Select ${label}` } })}>
                        <option value="" disabled >Select {label}</option>
                        {options.map((option) => (
                            <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
                    </select>

                );

            default:
                element = (
                    <input
                        className="border border-input px-3 py-2 text-sm placeholder:text-muted-foreground rounded-md focus:outline-gray-600 bg-[#e8f0fe] mb-1"
                        placeholder={placeholder}
                        type={type}
                        {...register(name, {
                            required: { value: true, message: `Please Enter ${label}` },
                        })}
                    />
                );
        }
        return element;
    }

    return (
        <form className='flex flex-col gap-2 text-black' onSubmit={handleSubmit(handleFormSubmit)}>
            {formControls.map((controlItem) => (
                <div key={controlItem.name} className="grid w-full items-center gap-1.5">
                    <Label>{controlItem.label}</Label>
                    {renderInputByComponentType(controlItem)}
                </div>
            ))}
            <Button className="mt-2" disabled={isSubmitting} type="submit" >{buttonText || "Submit"}</Button>
        </form>
    )

}
export default CommonForm



