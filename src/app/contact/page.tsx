"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded-md"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-md"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full p-2 border rounded-md"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full p-2 border rounded-md"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
