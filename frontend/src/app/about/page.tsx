import React from "react";
import {
  FaCheckCircle,
  FaUsers,
  FaBullseye,
  FaNewspaper,
} from "react-icons/fa";
import Image from "next/image";
import FloatingActionButtons from "@/components/ui/FloatingActionButtons";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-blue-700 dark:bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              About Daily News
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your trusted source for accurate, timely, and engaging news
              coverage
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Welcome to Daily News, your trusted source for the latest news and
              information. We are committed to delivering accurate, timely, and
              engaging news coverage across various topics.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Founded with a passion for journalism and a commitment to truth,
              Daily News has grown to become a leading voice in digital media,
              serving millions of readers worldwide.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-64 w-full md:h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/newsroom.jpg"
                alt="Our Newsroom"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <FaBullseye className="text-4xl text-blue-600 dark:text-blue-400" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Our Mission
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            To provide our readers with high-quality, unbiased news coverage and
            in-depth analysis of current events, helping them stay informed and
            make better decisions in an increasingly complex world.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide our journalism and organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaCheckCircle className="text-green-500 text-2xl" />,
                title: "Accuracy",
                description:
                  "We verify facts meticulously and correct errors promptly",
              },
              {
                icon: <FaNewspaper className="text-blue-500 text-2xl" />,
                title: "Independence",
                description: "Editorial decisions free from external influence",
              },
              {
                icon: <FaUsers className="text-purple-500 text-2xl" />,
                title: "Public Service",
                description:
                  "Commitment to informing and empowering communities",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                ),
                title: "Innovation",
                description:
                  "Embracing new technologies to enhance digital journalism",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Jane Smith",
                role: "Editor in Chief",
                image: "/images/team/editor.jpg",
              },
              {
                name: "Michael Johnson",
                role: "Head of Digital Content",
                image: "/images/team/digital.jpg",
              },
              {
                name: "Sarah Williams",
                role: "Lead Investigative Reporter",
                image: "/images/team/reporter.jpg",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-40 w-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 mt-8 text-center">
            Our team consists of experienced journalists, editors, and digital
            media professionals who are passionate about delivering quality news
            content to our readers.
          </p>
        </div>

        {/* Contact/Join Section */}
        <div className="bg-[#4FC3F7] dark:bg-[#3DA8D6] rounded-2xl text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl mb-8">
            Interested in working with us or have questions about Daily News?
          </p>
          <button className="bg-white text-[#4FC3F7] hover:bg-blue-50 px-8 py-3 rounded-full font-semibold text-lg transition-colors shadow-lg">
            Contact Us
          </button>
        </div>
      </div>
      <FloatingActionButtons />
    </div>
  );
}
