import { FormField, Input, Select } from 'semantic-ui-react';

function FormFieldComponent({
    required,
    title,
    placeholder,
    onChange,
    onBlur,
    select,
    options,
    value,
    className,
    error,
}) {
    return (
        <>
            {select ? (
                <FormField required={required}>
                    <label>{title}</label>
                    <Select
                        placeholder={placeholder}
                        options={options}
                        onChange={onChange}
                        value={value}
                        fluid
                        error={error}
                        onBlur={onBlur}
                    />
                    {error ? (
                        <>
                            <span className=" block text-red ">{error}</span>
                        </>
                    ) : null}
                </FormField>
            ) : (
                <FormField required={required}>
                    <label>{title}:</label>
                    <Input
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        className={className}
                        error={error}
                        onBlur={onBlur}
                    />
                    {error ? (
                        <>
                            <span className=" block text-red ">{error}</span>
                        </>
                    ) : null}
                </FormField>
            )}
        </>
    );
}

export default FormFieldComponent;
