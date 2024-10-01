import React from "react";

const Contact = () => {
  return (
    <div className="bg-white text-gray-800 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Contact Form */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <form className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-lg font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-lg mb-4">
              We'd love to hear from you! Reach out to us via the form or
              contact us directly at the details below:
            </p>
            <p className="text-lg mb-2">1234 Market St, Suite 100</p>
            <p className="text-lg mb-2">City, State, 12345</p>
            <p className="text-lg mb-2">
              Email:{" "}
              <a
                href="mailto:info@shoopyglobe.com"
                className="text-teal-500 hover:underline"
              >
                info@shoopyglobe.com
              </a>
            </p>
            <p className="text-lg">Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
