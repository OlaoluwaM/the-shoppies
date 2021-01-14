import { m as motion } from 'framer-motion';
import { ReactComponent as PopcornSvg } from '../assets/popcorn.svg';

export default function PopcornSVG(props) {
  return (
    <motion.div {...props}>
      <PopcornSvg />
    </motion.div>
  );
}
