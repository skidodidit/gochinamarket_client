import { Truck, Clock, Shield } from "lucide-react";
import { motion, Variants } from "framer-motion";

const features = [
  {
    icon: <Truck size={28} strokeWidth={1.2} />,
    title: "FAST DELIVERY",
    subtitle: "Experience fast delivery on your orders",
  },
  {
    icon: <Clock size={28} strokeWidth={1.2} />,
    title: "24/7 CUSTOMER SERVICE",
    subtitle: "Friendly 24/7 customer support",
  },
  {
    icon: <Shield size={28} strokeWidth={1.2} />,
    title: "MONEY BACK GUARANTEE",
    subtitle: "We return money for failed orders",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 0.8
    }
  }
};

const FeatureSection = () => {
  return (
    <motion.div 
      className="max-w-7xl mx-auto px-5 md:px-10 py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center"
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.3 }
            }}
          >
            {/* Icon Circle */}
            <motion.div 
              className="flex items-center justify-center w-16 h-16 rounded-full bg-black mb-4"
              variants={iconVariants}
            >
              <motion.div 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-primary-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                {feature.icon}
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.h3 
              className="text-base font-bold text-primary-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
            >
              {feature.title}
            </motion.h3>
            <motion.p 
              className="text-sm text-gray-300 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
            >
              {feature.subtitle}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FeatureSection;