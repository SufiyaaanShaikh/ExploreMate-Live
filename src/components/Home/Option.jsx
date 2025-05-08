import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Option Component for dropdown menu
const Option = ({ text, Icon, setDropdownOpen, path, onClick, bgHover, textHover }) => (
  <motion.li
    variants={itemVariants}
    className={`flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md ${bgHover} text-slate-700 ${textHover} transition-colors cursor-pointer`}
  >
    {path ? (
      <Link
        to={path}
        onClick={() => setDropdownOpen(false)}
        className="flex items-center w-full"
      >
        <Icon />
        <span className="ml-2">{text}</span>
      </Link>
    ) : (
      <div onClick={onClick} className="flex items-center w-full">
        <Icon />
        <span className="ml-2">{text}</span>
      </div>
    )}
  </motion.li>
);

export default Option;
// Animation Variants
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: {
      opacity: 0,
      y: -10,
    },
  };
  