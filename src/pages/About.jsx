import React from "react";
/*import image1 from "../assets/about.jpg";
import image3 from "../assets/about5.png";*/

const About = () => {
  return (
    <div className="bg-white-100 min-h-screen">
      {/* Main Section */}
      <main className="container mx-auto py-12 px-6">
        {/* About Us Section */}
        <section className="text-center mb-12">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "#185A79" }}
          >
            About Us
          </h1>
          <p className="text-gray-500">
            We are dedicated to providing exceptional healthcare services with
            compassion and expertise. Our mission is to improve the health and
            well-being of our community through innovative medical solutions and
            patient-centered care.
          </p>
        </section>

        {/* Services Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Care & Compassion",
              description: "Delivering healthcare services with empathy and understanding.",
              emoji: "❤",
              emojiColor: "text-red-500",
            },
            {
              title: "Expert Team",
              description: "Highly qualified medical professionals dedicated to your health.",
              emoji: "👨‍⚕",
              emojiColor: "text-blue-500",
            },
            {
              title: "Quality Service",
              description: "Committed to maintaining the highest standards of medical care.",
              emoji: "🌟",
              emojiColor: "text-yellow-500",
            },
          ].map((item, index) => (
            
            
            <div
              key={index}
              className="bg-white shadow-md p-6 text-center rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-300"
              >
             <div className={`text-4xl mb-4 ${item.emojiColor}`}>{item.emoji}</div>
              <h2 className="font-bold text-lg mb-2" style={{ color: "#185A79" }}>
                {item.title}
              </h2>
              <p className="text-gray-500">{item.description}</p>
            </div>
            
          ))}
        </section>

        {/* What is Medora Section */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <h2
              className="text-2xl font-bold"
              style={{ color: "#185A79" }}
            >
              What is Medora?
            </h2>
          </div>
          <div className="bg-white shadow-md p-8 rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-300">
            <p className="text-gray-500 mb-2">
              Medora is dedicated to providing accessible healthcare by connecting
              patients with the right specialists in their area.
            </p>
            <p className="text-gray-500 mb-2">
              Our platform helps users find healthcare professionals based on
              symptoms, medical history, and location, making healthcare more
              accessible and transparent.
            </p>
            <p className="text-gray-500">
              We also provide support for managing medications and timely
              reminders, ensuring that patients stay on track with their health
              regimens.
            </p>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="bg-white shadow-md p-8 rounded-lg mb-12">
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#185A79" }}
          >
            Our Values
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Integrity",
                description: "Maintaining highest ethical standards",
                emoji: "🤝",
                emojiColor: "text-blue-500",
              },
              {
                title: "Teamwork",
                description: "Collaborating for better outcomes",
                emoji: "🤝",
                emojiColor: "text-green-500",
              },
              {
                title: "Excellence",
                description: "Striving for the best results",
                emoji: "🌟",
                emojiColor: "text-yellow-500",
              },
              {
                title: "Innovation",
                description: "Embracing new solutions",
                emoji: "💡",
                emojiColor: "text-purple-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 shadow-md p-6 text-center rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-300"
              >
                 <div className={`text-4xl mb-4 ${item.emojiColor}`}>{item.emoji}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#185A79" }}>
                  {item.title}
                </h3>
                <p className="text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;