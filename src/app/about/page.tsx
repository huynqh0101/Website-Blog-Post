import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>

        <div className="prose dark:prose-invert">
          <p className="text-lg mb-6">
            Welcome to Daily News, your trusted source for the latest news and
            information. We are committed to delivering accurate, timely, and
            engaging news coverage across various topics.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            To provide our readers with high-quality, unbiased news coverage and
            in-depth analysis of current events, helping them stay informed and
            make better decisions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li>Accuracy and truthfulness in reporting</li>
            <li>Editorial independence</li>
            <li>Commitment to public service</li>
            <li>Innovation in digital journalism</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p className="mb-6">
            Our team consists of experienced journalists, editors, and digital
            media professionals who are passionate about delivering quality news
            content to our readers.
          </p>
        </div>
      </div>
    </div>
  );
}
