import ContactForm from "../components/ContactForm.jsx";

const Contact = () => {
    return (
        <div className=" flex flex-col items-center  my-2">
            <div className="py-8 md:py-16 px-4 md:px-20 flex flex-col items-center bg-gray-200 w-full ">
                <h1 className="text-[#17BD8D] text-5xl text-center md:text-6xl font-semibold my-2 ">Get in Touch with Us</h1>
                <p className="text-sm md:text-xl text-[#17BD8D]/90 text-center">Have questions about our books or looking to plan get started your new journey? We're here to help you!</p>
                <p className="text-xs md:text-xl text-[#17BD8D]/70 text-center hidden md:block">Reach out for any inquiries, books related assistance, or any books advice.  </p>

            </div>
            <ContactForm />
        </div>
    );
};

export default Contact;