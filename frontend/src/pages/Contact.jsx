import ContactForm from "../components/ContactForm.jsx";

const Contact = () => {
    return (
        <div className=" flex flex-col items-center  my-2">
            <div className="py-16 px-20 flex flex-col items-center bg-gray-200 w-full ">
                <h1 className="text-[#17BD8D] text-6xl font-semibold my-2">Get in Touch with Us</h1>
                <p className="text-xl text-[#17BD8D]/90 text-center">Have questions about our books or looking to plan get started your new journey? We're here to help you!</p>
                <p className="text-xl text-[#17BD8D]/70 text-center">Reach out for any inquiries, books related assistance, or any books advice.  </p>

            </div>
            <ContactForm />
        </div>
    );
};

export default Contact;