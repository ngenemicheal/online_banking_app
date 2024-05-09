import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function CustomFormField({ name, control, id }: FormFieldProps & {id: string}) {
  return (
    <FormField
        {...control}
        name={name}
        render={({ field }) => (
            <div className='form-item'>
                <FormLabel className='form-label'>{name.charAt(0).toUpperCase() + name.slice(1)}</FormLabel>
                <div className="flex flex-col w-full">
                    <FormControl>
                        <Input
                            id={id} 
                            placeholder={`Enter your ${name}`}
                            className='input-class'
                            {...field}
                            type={name === 'password' ? 'password' : 'text'}
                        />
                    </FormControl>
                    <FormMessage className='form-message mt-2' />
                </div>
            </div>
        )}
    />
  )
}
