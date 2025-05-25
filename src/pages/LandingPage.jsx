import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Users, MessageCircle, Star, LayoutGrid } from 'lucide-react';

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full bg-indigo-700 text-white py-4 shadow-md z-50">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8">
      <motion.h1
        className="text-2xl md:text-3xl font-extrabold tracking-tight"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        PeerConnect 🚀
      </motion.h1>
      <div className="flex space-x-6 mt-3 md:mt-0 text-base md:text-lg font-medium">
        <a href="/" className="hover:text-blue-300 transition">Home</a>
        <a href="/" className="hover:text-blue-300 transition">About</a>
        <a href="/" className="hover:text-blue-300 transition">Contact</a>
      </div>
    </div>
  </nav>
);

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center justify-center bg-white pt-28 px-4 md:px-8">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-12">
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-indigo-800 mb-6 leading-tight">
            Connect. Collaborate. Create.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto md:mx-0">
            PeerConnect is a platform that helps students network, share ideas, and collaborate on exciting projects.
          </p>
          <motion.button
            onClick={() => navigate('/auth')}
            className="bg-blue-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-blue-600 transition text-base sm:text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>

        <div className="flex-1 w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <iframe
            src="https://my.spline.design/genkubgreetingrobot-AwSLemJOaKJ9ZCAeWJ9HLXk7/"
            frameBorder="0"
            width="100%"
            height="100%"
            allowFullScreen
            title="Greeting Robot"
            className="rounded-lg border-none"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ title, description, Icon }) => (
  <motion.div
    className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition flex flex-col items-center text-center"
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="w-10 h-10 text-indigo-700 mb-4" />
    <h3 className="text-xl md:text-2xl font-bold text-indigo-800 mb-2">{title}</h3>
    <p className="text-sm md:text-base text-gray-600">{description}</p>
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    { title: "Interest-Based Connections", description: "Discover students with shared interests and goals.", Icon: Users },
    { title: "Project Collaboration", description: "Form teams and work together on exciting ideas.", Icon: LayoutGrid },
    { title: "Real-Time Chat", description: "Connect instantly with your network.", Icon: MessageCircle },
    { title: "Profile Customization", description: "Showcase your skills and projects.", Icon: Star }
  ];

  return (
    <section className="py-16 bg-gray-100 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-10">Features</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => <FeatureCard key={idx} {...f} />)}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Anjali R.",
      college: "IIT Delhi",
      alt: "Anjali's image",
      text: "PeerConnect helped me find my project team and we ended up winning our college hackathon!",
      image: "/users/user-1.jpg"
    },
    {
      name: "Rahul M.",
      college: "NIT Trichy",
      alt: "Rahul's image",
      text: "I met my startup co-founder through PeerConnect. It really changed my college life!",
      image: "/users/user-2.jpg"
    },
    {
      name: "Sana P.",
      college: "BITS Pilani",
      alt: "Sana's image",
      text: "A great platform to explore ideas and connect with like-minded peers.",
      image: "/users/user-3.png"
    }
  ];

  return (
    <section className="py-20 bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-12">What Students Say</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-50 p-6 rounded-2xl shadow-sm text-center flex flex-col justify-between
                         hover:shadow-lg hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.2 }}
            >
              <img
                src={t.image}
                alt={t.alt}
                className="w-32 h-32 object-cover mx-auto mb-4 rounded-full border"
              />
              <div className="mb-3">
                <p className="font-semibold text-lg text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.college}</p>
              </div>
              <p className="text-gray-700 text-sm sm:text-base italic leading-relaxed">“{t.text}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section className="py-16 bg-gray-100 px-4 md:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-6">About PeerConnect</h2>
      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
        PeerConnect is built to connect like-minded students who are eager to build, learn, and grow.
        Whether you're a coder, designer, or marketer — this is your community.
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-indigo-700 text-white py-6 text-center">
    <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 px-4">
      <p className="text-sm sm:text-base">&copy; 2025 PeerConnect. All rights reserved.</p>
      <div className="flex space-x-5">
        <a href="#"><Facebook className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-300 transition" /></a>
        <a href="#"><Twitter className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-300 transition" /></a>
        <a href="#"><Instagram className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-300 transition" /></a>
      </div>
    </div>
  </footer>
);

const LandingPage = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <Testimonials />
    <AboutSection />
    <Footer />
  </div>
);

export default LandingPage;
