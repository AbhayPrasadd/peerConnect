import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

// Lazy load Spline only on client
const Spline = lazy(() => import('@splinetool/react-spline'));

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2 className="text-red-600 text-center mt-10">Something went wrong while loading a component.</h2>;
    }
    return this.props.children;
  }
}

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full bg-green-700 text-white py-4 shadow-lg z-50">
    <div className="container mx-auto flex justify-between items-center px-6">
      <motion.h1
        className="text-2xl font-bold"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        PeerConnect 🚀
      </motion.h1>
      <div className="space-x-6">
        <a href="/" className="hover:text-yellow-400">Home</a>
        <a href="/" className="hover:text-yellow-400">About</a>
        <a href="/" className="hover:text-yellow-400">Contact</a>
      </div>
    </div>
  </nav>
);

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-white pt-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-green-800 mb-4">Connect. Collaborate. Create.</h1>
          <p className="text-lg text-gray-700 mb-6 max-w-lg">
            PeerConnect is a student-only networking platform that helps you discover peers, share ideas, and collaborate on amazing projects.
          </p>
          <motion.button
            onClick={() => navigate('/auth')}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>

       <div className="flex-1 w-full h-[600px] md:h-[600px] relative">
  <div className="w-full h-full">
    <iframe
      src="https://my.spline.design/genkubgreetingrobot-AwSLemJOaKJ9ZCAeWJ9HLXk7/"
      frameBorder="0"
      width="100%"
      height="100%"
      allow="fullscreen"
      title="Greeting Robot"
    ></iframe>
  </div>
</div>

      </div>
    </section>
  );
};

const FeatureCard = ({ title, description }) => (
  <motion.div
    className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300"
    whileHover={{ scale: 1.03 }}
  >
    <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    { title: "Interest-Based Connections", description: "Discover students with shared interests and goals." },
    { title: "Project Collaboration", description: "Form teams and work together on exciting ideas." },
    { title: "Real-Time Chat", description: "Connect instantly with your network." },
    { title: "Profile Customization", description: "Showcase your skills and projects." }
  ];

  return (
    <section className="py-16 bg-gray-100 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-10">Features</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {features.map((f, idx) => <FeatureCard key={idx} {...f} />)}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-16 bg-white px-6">
    <div className="container mx-auto text-center max-w-3xl">
      <h2 className="text-3xl font-bold text-green-800 mb-6">What Students Say</h2>
      <motion.blockquote
        className="italic text-gray-700"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        "PeerConnect helped me find my project team and we ended up winning our college hackathon! It's the LinkedIn for students."
      </motion.blockquote>
      <p className="mt-4 font-semibold text-gray-800">— Anjali R., IIT Delhi</p>
    </div>
  </section>
);

const AboutSection = () => (
  <section className="py-16 bg-gray-100 px-6">
    <div className="container mx-auto text-center max-w-4xl">
      <h2 className="text-3xl font-bold text-green-800 mb-4">About PeerConnect</h2>
      <p className="text-gray-700 text-lg">
        PeerConnect is built to bridge the gap between students who want to build, learn, and grow together.
        Our platform is for coders, designers, marketers — anyone with a drive to build!
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-green-700 text-white py-6 text-center">
    <div className="container mx-auto flex flex-col items-center">
      <p className="mb-4">&copy; 2025 PeerConnect. All rights reserved.</p>
      <div className="flex space-x-4">
        <a href="#"><Facebook className="w-6 h-6 hover:text-yellow-400 transition" /></a>
        <a href="#"><Twitter className="w-6 h-6 hover:text-yellow-400 transition" /></a>
        <a href="#"><Instagram className="w-6 h-6 hover:text-yellow-400 transition" /></a>
      </div>
    </div>
  </footer>
);

const LandingPage = () => (
  <ErrorBoundary>
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Testimonials />
      <AboutSection />
      <Footer />
    </div>
  </ErrorBoundary>
);

export default LandingPage;
