import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from "yup";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
};

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: "checkbox"});
    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...props} {...field}/>
                {children}
            </label>
            
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
};

const CustomForm = () => {
    return (
        <Formik
            initialValues = {{
                name: "",
                email: "",
                amount: 0,
                currency: "",
                text: "",
                terms: false    
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                    .min(2, "Minimum 2 characters to fill in")
                    .required("Required field"),
                email: Yup.string()
                    .email("Invalid email address")
                    .required("Required field"),
                amount: Yup.number()
                    .min(5, "Not less than 5")
                    .required("Required field"),
                currency: Yup.string().required("Select currency"),
                text: Yup.string().min(10, "Not less than 10 characters"),
                terms: Yup.boolean()
                    .required("Consent is required")
                    .oneOf([true], "Consent is required")
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2> Send donation</h2>
                <MyTextInput 
                    label="Your name"
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput 
                    label="Your email"
                    id="email"
                    name="email"
                    type="email"
                />
                <label htmlFor="amount">Amount</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component="div" />
                <label htmlFor="currency">Currency</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                    >
                        <option value="">Select currency</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="UAH">UAH</option>
                </Field>
                <ErrorMessage className="error" name="currency" component="div" />
                <label htmlFor="text">Your message</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component="div" />
                <MyCheckbox name="terms">
                    Do you agree with the privacy policy?
                </MyCheckbox> 
                <button type="submit">Send</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;

//With useFormik hook

// import { useFormik } from "formik";
// import * as Yup from "yup";

// const Form = () => {
//     const formik = useFormik({
//         initialValues: {
//             name: "",
//             email: "",
//             amount: 0,
//             currency: "",
//             text: "",
//             terms: false    
//         },
//         validationSchema: Yup.object({
//             name: Yup.string()
//                 .min(2, "Minimum 2 characters to fill in")
//                 .required("Required field"),
//             email: Yup.string()
//                 .email("Invalid email address")
//                 .required("Required field"),
//             amount: Yup.number()
//                 .min(5, "Not less than 5")
//                 .required("Required field"),
//             currency: Yup.string().required("Select currency"),
//             text: Yup.string().min(10, "Not less than 10 characters"),
//             terms: Yup.boolean()
//                 .required("Consent is required")
//                 .oneOf([true], "Consent is required")
//         }),
//         onSubmit: values => console.log(JSON.stringify(values, null, 2))
//     })

//     return (
//         <form className="form" onSubmit={formik.handleSubmit}>
//             <h2> Send donation</h2>
//             <label htmlFor="name">Your name</label>
//             <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//             />
//             {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
//             <label htmlFor="email">Your email</label>
//             <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//             />
//             {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
//             <label htmlFor="amount">Amount</label>
//             <input
//                 id="amount"
//                 name="amount"
//                 type="number"
//                 value={formik.values.amount}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//             />
//             {formik.errors.amount && formik.touched.amount ? <div className="error">{formik.errors.amount}</div> : null}
//             <label htmlFor="currency">Currency</label>
//             <select
//                 id="currency"
//                 name="currency"
//                 value={formik.values.currency}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 >
//                     <option value="">Select currency</option>
//                     <option value="USD">USD</option>
//                     <option value="UAH">UAH</option>
//                     <option value="RUB">RUB</option>
//             </select>
//             {formik.errors.currency && formik.touched.currency ? <div className="error">{formik.errors.currency}</div> : null}
//             <label htmlFor="text">Your message</label>
//             <textarea 
//                 id="text"
//                 name="text"
//                 value={formik.values.text}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//             />
//             {formik.errors.text && formik.touched.text ? <div className="error">{formik.errors.text}</div> : null}
//             <label className="checkbox">
//                 <input 
//                     name="terms" 
//                     type="checkbox"
//                     value={formik.values.terms}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                 />
//                 Do you agree with the privacy policy?
//             </label>
//             {formik.errors.terms && formik.touched.terms ? <div className="error">{formik.errors.terms}</div> : null}
//             <button type="submit">Send</button>
//         </form>
//     )
// }

// export default Form;