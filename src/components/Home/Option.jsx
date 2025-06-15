import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

// Option Component for dropdown menu
const Option = ({
  text,
  Icon,
  setDropdownOpen,
  path,
  onClick,
  bgHover,
  textHover,
  itemVariants,
}) => (
  <motion.li
    variants={itemVariants}
    className={`flex items-center justify-between gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md ${bgHover} text-slate-700 ${textHover} transition-colors cursor-pointer`}
  >
    {path ? (
      <>
        <Link
          to={path}
          onClick={() => setDropdownOpen(false)}
          className="flex items-center w-full"
        >
          <Icon />
          <span className="ml-2">{text}</span>
        </Link>
        <MdOutlineKeyboardArrowRight />
      </>
    ) : (
      <div onClick={onClick} className="flex items-center w-full">
        <Icon />
        <span className="ml-2">{text}</span>
      </div>
    )}
  </motion.li>
);

export default Option;
